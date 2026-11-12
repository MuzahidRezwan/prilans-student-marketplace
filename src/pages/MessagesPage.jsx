import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Send,
  User,
  Clock,
  Sparkles,
  Inbox
} from 'lucide-react';

export default function MessagesPage() {
  const { messages, currentUser, sendMessage, users } = useApp();

  const [selectedUser, setSelectedUser] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Messages involving currentUser
  const myMessages = messages.filter(
    m => m.fromId === currentUser.id || m.toId === currentUser.id
  );

  // Group contacts
  const contactIds = Array.from(new Set(
    myMessages.map(m => m.fromId === currentUser.id ? m.toId : m.fromId)
  ));

  const contacts = contactIds
    .map(id => users.find(u => u.id === id))
    .filter(Boolean);

  const activeContact = selectedUser || contacts[0] || null;

  const conversation = activeContact
    ? myMessages.filter(
        m => (m.fromId === activeContact.id && m.toId === currentUser.id) ||
             (m.fromId === currentUser.id && m.toId === activeContact.id)
      )
    : [];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeContact) return;

    sendMessage({
      toId: activeContact.id,
      toName: activeContact.name || activeContact.company,
      projectTitle: 'Direct Conversation',
      content: replyText,
    });

    setReplyText('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-3 min-h-[600px]">
        {/* Left Contacts List */}
        <div className="border-r border-slate-100 flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-base">Direct Conversations</h2>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
              {contacts.length}
            </span>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {contacts.length > 0 ? (
              contacts.map(c => (
                <div
                  key={c.id}
                  onClick={() => setSelectedUser(c)}
                  className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${
                    activeContact?.id === c.id ? 'bg-blue-50/70 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="overflow-hidden min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{c.name}</h4>
                    <span className="text-[10px] text-slate-400 block truncate">{c.role.toUpperCase()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 italic">
                No active message threads yet. Apply to projects or invite students to start chatting!
              </div>
            )}
          </div>
        </div>

        {/* Right Active Conversation */}
        <div className="md:col-span-2 flex flex-col justify-between bg-slate-50/30">
          {activeContact ? (
            <>
              {/* Active Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <img src={activeContact.avatar} alt={activeContact.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{activeContact.name}</h3>
                    <p className="text-xs text-slate-400">{activeContact.university || activeContact.company}</p>
                  </div>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                {conversation.map(msg => {
                  const isMe = msg.fromId === currentUser.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed ${
                          isMe
                            ? 'bg-blue-600 text-white rounded-br-none shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                        }`}
                      >
                        <p>{msg.content}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Input Box */}
              <form onSubmit={handleSendReply} className="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type a message or response..."
                  className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <MessageSquare className="w-12 h-12 text-slate-300 mb-2" />
              <p className="text-sm font-semibold">Select a conversation to view messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
