import React, { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { io } from "socket.io-client";
import {
  createConversation,
  getConversationMessages,
  getConversations,
  getProfile,
  searchUserByPhone,
  sendConversationMessage,
} from "../../api/webApiController";
import { auth, firebaseConfigured } from "../../utils/firebase";
import { webConstants } from "../../utils/webConstants";
import "./MessengerScreen.css";

const MessengerScreen = () => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [status, setStatus] = useState("");
  const [authReady, setAuthReady] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const socketRef = useRef(null);
  const selectedConversationRef = useRef(null);
  const messageListRef = useRef(null);

  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  useEffect(() => {
    if (!auth) {
      setAuthReady(true);
      setStatus("Firebase is not configured. Set up phone authentication first.");
      return undefined;
    }

    return onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setAuthReady(true);
      if (!user) {
        window.location.hash = "/";
      }
    });
  }, []);

  useEffect(() => {
    if (!firebaseUser) {
      return undefined;
    }

    let active = true;
    const loadAccount = async () => {
      try {
        const [profileResponse, conversationsResponse] = await Promise.all([
          getProfile(),
          getConversations(),
        ]);
        if (active) {
          setProfile(profileResponse.data.data);
          setConversations(conversationsResponse.data.data);
        }
      } catch (_error) {
        if (active) {
          setStatus("Could not load your FRWhatsapp account. Try refreshing.");
        }
      }
    };

    loadAccount();
    firebaseUser
      .getIdToken()
      .then((token) => {
        if (!active) {
          return;
        }
        const socket = io(webConstants.API.SOCKET_URL, {
          auth: { token },
        });
        socketRef.current = socket;
        socket.on("message:new", (message) => {
          if (
            selectedConversationRef.current &&
            selectedConversationRef.current._id === message.conversationId
          ) {
            setMessages((currentMessages) =>
              currentMessages.some((item) => item._id === message._id)
                ? currentMessages
                : [...currentMessages, message]
            );
          }
          getConversations()
            .then((response) => setConversations(response.data.data))
            .catch(() =>
              setStatus("A new message arrived, but the chat list did not refresh.")
            );
        });
        socket.on("connect_error", () => {
          setStatus("Live updates are unavailable. Check your connection.");
        });
      })
      .catch(() => {
        if (active) {
          setStatus("Could not authenticate the live connection.");
        }
      });

    return () => {
      active = false;
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [firebaseUser]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const openConversation = async (conversation) => {
    setSelectedConversation(conversation);
    setMessages([]);
    setStatus("");
    try {
      const response = await getConversationMessages(conversation._id);
      setMessages(response.data.data);
    } catch (_error) {
      setStatus("Could not load this conversation.");
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setStatus("");
    setSearchResult(null);
    try {
      const normalizedPhone = searchPhone.replace(/[\s()-]/g, "");
      const response = await searchUserByPhone(normalizedPhone);
      setSearchResult(response.data.data);
      if (!response.data.data) {
        setStatus("No FRWhatsapp account was found for that number.");
      }
    } catch (error) {
      setStatus(
        error.response && error.response.status === 429
          ? "Too many searches. Please wait before trying again."
          : "Could not search for that FRWhatsapp account."
      );
    }
  };

  const startConversation = async () => {
    if (!searchResult) {
      return;
    }
    try {
      const response = await createConversation(searchResult.userId);
      const conversation = response.data.data;
      setConversations((current) => [
        conversation,
        ...current.filter((item) => item._id !== conversation._id),
      ]);
      setSearchResult(null);
      setSearchPhone("");
      await openConversation(conversation);
    } catch (_error) {
      setStatus("Could not start that FRWhatsapp conversation.");
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!selectedConversation || !messageText.trim() || isSending) {
      return;
    }

    const text = messageText.trim();
    setIsSending(true);
    setStatus("");
    try {
      const response = await sendConversationMessage(
        selectedConversation._id,
        text
      );
      setMessages((current) => [...current, response.data.data]);
      setMessageText("");
      const conversationsResponse = await getConversations();
      setConversations(conversationsResponse.data.data);
    } catch (_error) {
      setStatus("Message was not sent. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
    }
  };

  if (!firebaseConfigured) {
    return (
      <main className="fr-messenger fr-messenger--notice">
        Firebase is not configured. Set the Firebase web environment variables
        before opening the messenger.
      </main>
    );
  }

  if (!authReady || !firebaseUser) {
    return <main className="fr-messenger fr-messenger--notice">Loading...</main>;
  }

  return (
    <main className="fr-messenger">
      <aside className="fr-messenger__sidebar">
        <header className="fr-messenger__sidebar-header">
          <div className="fr-brand">
            <span className="fr-brand__mark" aria-hidden="true">
              FR
            </span>
            <span className="fr-brand__name">FRWhatsapp</span>
          </div>
          <button
            className="fr-messenger__signout"
            type="button"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </header>

        <section className="fr-messenger__account">
          <strong>{profile ? profile.userName : "Your account"}</strong>
          <span>{firebaseUser.phoneNumber}</span>
        </section>

        <form className="fr-contact-search" onSubmit={handleSearch}>
          <label htmlFor="fr-contact-phone">Find a FRWhatsapp contact</label>
          <div className="fr-contact-search__row">
            <input
              id="fr-contact-phone"
              type="tel"
              inputMode="tel"
              placeholder="+15550101234"
              value={searchPhone}
              onChange={(event) => setSearchPhone(event.target.value)}
            />
            <button type="submit">Find</button>
          </div>
        </form>

        {searchResult && (
          <button
            className="fr-contact-result"
            type="button"
            onClick={startConversation}
          >
            <span className="fr-contact-result__avatar">
              {searchResult.userName.charAt(0).toUpperCase()}
            </span>
            <span>
              <strong>{searchResult.userName}</strong>
              <small>{searchResult.phoneNumber}</small>
            </span>
            <span className="fr-contact-result__action">Chat</span>
          </button>
        )}

        <div className="fr-conversation-list" aria-label="Conversations">
          {conversations.map((conversation) => (
            <button
              className={`fr-conversation ${
                selectedConversation &&
                selectedConversation._id === conversation._id
                  ? "fr-conversation--active"
                  : ""
              }`}
              key={conversation._id}
              type="button"
              onClick={() => openConversation(conversation)}
            >
              <span className="fr-conversation__avatar">
                {conversation.contact
                  ? conversation.contact.userName.charAt(0).toUpperCase()
                  : "?"}
              </span>
              <span className="fr-conversation__details">
                <strong>
                  {conversation.contact
                    ? conversation.contact.userName
                    : "FRWhatsapp user"}
                </strong>
                <small>
                  {conversation.lastMessage
                    ? conversation.lastMessage.text
                    : "Start a conversation"}
                </small>
              </span>
            </button>
          ))}
          {conversations.length === 0 && (
            <p className="fr-conversation-list__empty">
              Find a contact who has joined FRWhatsapp to start chatting.
            </p>
          )}
        </div>
      </aside>

      <section className="fr-messenger__chat">
        {selectedConversation ? (
          <>
            <header className="fr-chat-header">
              <span className="fr-chat-header__avatar">
                {selectedConversation.contact
                  ? selectedConversation.contact.userName.charAt(0).toUpperCase()
                  : "?"}
              </span>
              <span>
                <strong>
                  {selectedConversation.contact
                    ? selectedConversation.contact.userName
                    : "FRWhatsapp user"}
                </strong>
                <small>
                  {selectedConversation.contact &&
                    selectedConversation.contact.phoneNumber}
                </small>
              </span>
            </header>

            <div className="fr-message-list" ref={messageListRef}>
              {messages.map((message) => (
                <div
                  className={`fr-message ${
                    message.senderId === firebaseUser.uid
                      ? "fr-message--mine"
                      : ""
                  }`}
                  key={message._id}
                >
                  <p>{message.text}</p>
                  <time dateTime={message.createdAt}>
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
              ))}
              {messages.length === 0 && (
                <p className="fr-message-list__empty">
                  Say hello to start your conversation.
                </p>
              )}
            </div>

            <form className="fr-message-composer" onSubmit={handleSendMessage}>
              <input
                type="text"
                maxLength="4000"
                placeholder="Write a message..."
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
                aria-label="Message"
              />
              <button type="submit" disabled={isSending || !messageText.trim()}>
                {isSending ? "Sending..." : "Send"}
              </button>
            </form>
          </>
        ) : (
          <div className="fr-messenger__welcome">
            <span className="fr-messenger__welcome-mark">FR</span>
            <h1>Your conversations, together.</h1>
            <p>Find an FRWhatsapp contact to start a private chat.</p>
          </div>
        )}
        <p className="fr-messenger__status" role="status" aria-live="polite">
          {status}
        </p>
        <p className="fr-messenger__privacy">
          Messages are stored on the FRWhatsapp server and are not end-to-end
          encrypted yet. Chat only with people who have joined FRWhatsapp.
        </p>
      </section>
    </main>
  );
};

export default MessengerScreen;
