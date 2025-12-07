import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2, Camera, Image as ImageIcon, MapPin, ExternalLink } from 'lucide-react';
import { createChatSession, sendMessage } from '../services/geminiService';
import { ChatMessage } from '../types';

export const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleOpen = () => {
    if (!chatSession) {
      try {
        const session = createChatSession();
        setChatSession(session);
      } catch (e) {
        console.error("Failed to init chat", e);
      }
    }
    setIsOpen(true);
    if (messages.length === 0) {
        setMessages([{ role: 'model', text: 'היי גלגול, אני כאן בשבילך. איך את מרגישה? את יכולה לשאול אותי על מקומות (אני מחובר למפות!) או לצלם לי תפריטים ואתרגם לך.' }]);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || !chatSession) return;

    const userMsgText = input;
    const userMsgImage = selectedImage;
    
    setInput('');
    setSelectedImage(null); // Clear image after sending

    // Add user message to UI
    setMessages(prev => [...prev, { 
      role: 'user', 
      text: userMsgText, 
      image: userMsgImage || undefined 
    }]);
    
    setIsLoading(true);

    try {
      const reply = await sendMessage(chatSession, userMsgText, userMsgImage || undefined);
      if (reply) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: reply.text, 
          mapLinks: reply.mapLinks 
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'סליחה, יש לי בעיה קטנה בחיבור כרגע. נסי שוב עוד רגע.', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={handleOpen}
        className="fixed bottom-6 left-6 bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-105 z-50 flex items-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        <span className="hidden md:inline font-medium">המדריך האישי</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 w-[90vw] md:w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl border border-teal-100 z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-teal-600 p-4 flex justify-between items-center text-white shadow-md">
        <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-200" />
            <div>
              <h3 className="font-bold text-sm">העוזר האישי למסע</h3>
              <p className="text-[10px] text-teal-100 opacity-90">מחובר ל-Google Maps & Vision</p>
            </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-teal-500 p-1 rounded-full transition">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-start' : 'items-end'}`}>
            <div className={`max-w-[90%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-teal-100 text-teal-900 rounded-br-none ml-auto' 
                : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none mr-auto'
            }`}>
              {/* User Uploaded Image */}
              {msg.image && (
                <div className="mb-2 rounded-lg overflow-hidden border border-teal-200">
                  <img src={msg.image} alt="Uploaded" className="w-full max-h-40 object-cover" />
                </div>
              )}
              
              {/* Message Text */}
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {/* Grounding Links (Maps) */}
              {msg.mapLinks && msg.mapLinks.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-100 space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 mb-1">מקורות (Google Maps):</p>
                  {msg.mapLinks.map((link, i) => (
                    <a 
                      key={i} 
                      href={link.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-slate-50 hover:bg-blue-50 rounded-lg text-xs text-blue-600 transition-colors border border-slate-200"
                    >
                      <MapPin className="w-3 h-3 flex-shrink-0 text-red-500" />
                      <span className="truncate flex-1">{link.title}</span>
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-end mr-auto">
             <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100">
                <Loader2 className="w-4 h-4 animate-spin text-teal-500" />
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-slate-100">
        {selectedImage && (
          <div className="mb-2 relative inline-block">
            <img src={selectedImage} alt="Preview" className="h-16 rounded-lg border border-slate-200 shadow-sm" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-1 -left-1 bg-rose-500 text-white rounded-full p-0.5 shadow-md hover:scale-110 transition"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        
        <div className="flex gap-2 items-end">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleImageSelect}
          />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-slate-100 text-slate-500 p-2.5 rounded-xl hover:bg-teal-50 hover:text-teal-600 transition flex-shrink-0"
            title="העלאת תמונה"
          >
            <Camera className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
             <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="שאלי אותי או צלמי תפריט..."
              rows={1}
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none resize-none no-scrollbar"
              style={{ minHeight: '42px', maxHeight: '80px' }}
            />
          </div>

          <button 
            onClick={handleSend}
            disabled={(isLoading || (!input.trim() && !selectedImage))}
            className="bg-teal-600 text-white p-2.5 rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};