import { useState, useRef, useEffect } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatMessages } from '@/data/mockData';
import { cn } from '@/lib/utils';
import {
  Bot,
  Send,
  User,
  Sparkles,
  BookOpen,
  Wrench,
  Plane,
  Cpu,
  Lightbulb,
  RotateCcw,
} from 'lucide-react';

const quickQuestions = [
  { icon: BookOpen, label: 'Engine start procedure', query: 'What is the engine start procedure for AL-31FP?' },
  { icon: Wrench, label: 'Hydraulic system check', query: 'How do I check hydraulic system pressure?' },
  { icon: Plane, label: 'Pre-flight checklist', query: 'What is the pre-flight checklist for Su-30MKI?' },
  { icon: Cpu, label: 'Avionics troubleshooting', query: 'How to troubleshoot radar system issues?' },
];

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: string[];
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(chatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(input),
        timestamp: new Date().toISOString(),
        sources: ['IAF Training Manual', 'Technical Documentation'],
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('engine') && lowerQuery.includes('start')) {
      return `The AL-31FP engine start procedure involves the following steps:

1. **Pre-start Checklist**: Verify all engine parameters are within normal range
2. **APU Start**: Start the Auxiliary Power Unit and verify bleed air pressure
3. **Engine Crank**: Engage the starter and monitor N2 rotation
4. **Fuel Introduction**: Introduce fuel at 15% N2 and monitor EGT closely
5. **Light-off**: Confirm engine light-off at rising EGT
6. **Stabilization**: Allow engine to stabilize at idle RPM

**Critical Parameters to Monitor:**
- N1 and N2 rotation speeds
- EGT (must not exceed 750°C during start)
- Fuel pressure
- Oil pressure

Would you like me to elaborate on any specific step?`;
    }
    
    if (lowerQuery.includes('hydraulic')) {
      return `Hydraulic System Check Procedure:

**Normal Operating Parameters:**
- Pressure: 3000 ± 200 PSI
- Temperature: 70-120°C
- Fluid Level: Between MIN and MAX marks

**Check Procedure:**
1. Verify hydraulic pump operation (listen for normal sound)
2. Check pressure gauge readings on all three systems
3. Inspect for leaks around actuators and lines
4. Verify accumulator pressure
5. Test emergency hydraulic system

**Warning Indications:**
- HYD 1/2/3 warnings on caution panel
- Low pressure indications
- High temperature warnings

If any abnormalities are detected, refer to the emergency procedures manual.`;
    }
    
    if (lowerQuery.includes('pre-flight') || lowerQuery.includes('checklist')) {
      return `Su-30MKI Pre-Flight Checklist:

**Exterior Inspection:**
- ✓ Control surfaces - free movement, no damage
- ✓ Landing gear - tires, struts, doors
- ✓ Engine intakes - clear of debris
- ✓ Fuel caps - secure, no leaks
- ✓ Pitot tubes - clear, covers removed
- ✓ Static ports - clear

**Cockpit Checks:**
- ✓ Ejection seat - armed, pins removed
- ✓ Canopy - clean, secure
- ✓ Instruments - all functioning
- ✓ Radios - operational
- ✓ Navigation systems - aligned
- ✓ Weapons systems - safe

**Engine Start:**
- ✓ Fuel pumps - ON
- ✓ Battery - ON
- ✓ APU - START

This is a simplified checklist. Always refer to the complete checklist in your flight manual.`;
    }

    return `I understand you're asking about "${query}". As your AI training assistant, I can help you with:

- Aircraft systems and procedures
- Maintenance protocols
- Emergency procedures
- Technical documentation
- Training module guidance

Could you please be more specific about what aspect you'd like to learn about? For example:
- Specific system (engine, hydraulics, avionics)
- Procedure type (startup, shutdown, emergency)
- Aircraft type (Su-30MKI, MiG-29, etc.)

I'm here to help make your training more effective!`;
  };

  const handleQuickQuestion = (query: string) => {
    setInput(query);
  };

  const clearChat = () => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to the IAF Training Intelligence Platform. I am your AI training assistant. How can I help you today?',
      timestamp: new Date().toISOString(),
    }]);
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] flex flex-col">
      <PageHeader
        title="AI Training Assistant"
        subtitle="Ask questions about aircraft systems, procedures, and training materials"
        icon={Bot}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={clearChat}
            className="border-iaf-navy-light text-iaf-sky hover:bg-iaf-navy-light/50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear Chat
          </Button>
        }
      />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Quick Questions Sidebar */}
        <div className="hidden lg:block space-y-4">
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-iaf-gold" />
                <h3 className="text-sm font-medium text-iaf-sky">Quick Questions</h3>
              </div>
              <div className="space-y-2">
                {quickQuestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(item.query)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-iaf-navy-light/30 hover:bg-iaf-navy-light/50 transition-colors text-left"
                  >
                    <item.icon className="w-4 h-4 text-iaf-sky/60" />
                    <span className="text-sm text-iaf-sky/80">{item.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-iaf-cyan" />
                <h3 className="text-sm font-medium text-iaf-sky">AI Capabilities</h3>
              </div>
              <ul className="space-y-2 text-sm text-iaf-sky/60">
                <li className="flex items-start gap-2">
                  <span className="text-iaf-cyan">•</span>
                  Answer technical questions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-iaf-cyan">•</span>
                  Explain procedures step-by-step
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-iaf-cyan">•</span>
                  Reference training materials
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-iaf-cyan">•</span>
                  Provide troubleshooting guidance
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 flex flex-col min-h-0">
          <Card className="bg-iaf-navy/60 border-iaf-navy-light/30 flex-1 flex flex-col min-h-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-3',
                      message.role === 'user' && 'flex-row-reverse'
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                      message.role === 'assistant'
                        ? 'bg-iaf-gold/20'
                        : 'bg-iaf-cyan/20'
                    )}>
                      {message.role === 'assistant' ? (
                        <Bot className="w-4 h-4 text-iaf-gold" />
                      ) : (
                        <User className="w-4 h-4 text-iaf-cyan" />
                      )}
                    </div>
                    <div className={cn(
                      'max-w-[80%] rounded-lg p-3',
                      message.role === 'assistant'
                        ? 'bg-iaf-navy-light/50'
                        : 'bg-iaf-cyan/10 border border-iaf-cyan/30'
                    )}>
                      <div className="text-sm text-iaf-sky whitespace-pre-line">
                        {message.content}
                      </div>
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-iaf-navy-light/30">
                          <p className="text-xs text-iaf-sky/50 mb-1">Sources:</p>
                          <div className="flex flex-wrap gap-1">
                            {message.sources.map((source, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-2 py-0.5 bg-iaf-navy-light rounded text-iaf-sky/60"
                              >
                                {source}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <p className="text-[10px] text-iaf-sky/40 mt-2">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-iaf-gold/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-iaf-gold" />
                    </div>
                    <div className="bg-iaf-navy-light/50 rounded-lg p-3">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-iaf-sky/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-iaf-sky/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-iaf-sky/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-iaf-navy-light/30">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about aircraft systems, procedures, or training materials..."
                  className="flex-1 bg-iaf-navy-light/50 border-iaf-navy-light text-iaf-sky placeholder:text-iaf-sky/40"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-iaf-gold hover:bg-iaf-gold-light text-iaf-navy-dark disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-iaf-sky/40 mt-2 text-center">
                AI responses are based on IAF training materials and technical documentation
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
