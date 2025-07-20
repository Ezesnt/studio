
"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, X, Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FaqBotProps {
  faqs: FaqItem[];
}

interface Message {
  type: 'user' | 'bot';
  content: string | React.ReactNode;
}

export function FaqBot({ faqs }: FaqBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset messages when opening
      setMessages([]);
    }
  };

  const handleQuestionClick = (faq: FaqItem) => {
    setMessages([
      ...messages,
      { type: 'user', content: faq.question },
      { type: 'bot', content: faq.answer },
    ]);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={toggleOpen} size="icon" className="rounded-full w-14 h-14 shadow-lg">
          {isOpen ? <X /> : <Bot />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm">
          <Card className="flex flex-col h-[60vh] shadow-2xl">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center gap-2">
                <Bot className="text-primary" />
                <span>Asistente de Ayuda</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col p-0 overflow-hidden">
              <ScrollArea className="flex-grow p-4">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-end gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.type === 'bot' && <Bot className="w-6 h-6 text-primary flex-shrink-0" />}
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          msg.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {typeof msg.content === 'string' ? <p>{msg.content}</p> : msg.content}
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                     <div className="text-center text-muted-foreground">
                        <p>¡Hola! Soy tu asistente. ¿Cómo puedo ayudarte?</p>
                     </div>
                  )}
                </div>
              </ScrollArea>
              <div className="flex-shrink-0 border-t p-2">
                <p className="text-sm font-medium mb-2 px-2 text-muted-foreground">O elige una pregunta frecuente:</p>
                <ScrollArea className="h-32">
                  <div className="space-y-2 px-2 pb-2">
                    {faqs.map((faq, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start text-left h-auto whitespace-normal"
                        onClick={() => handleQuestionClick(faq)}
                      >
                        {faq.question}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
