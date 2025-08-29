import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/hooks/use-language';
import { 
    MessageCircle, 
    Send, 
    Search, 
    MoreVertical,
    Phone,
    Video,
    Info,
    Paperclip,
    Smile,
    X,
    Circle
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ChatUser {
    id: string;
    name: string;
    avatar?: string;
    status: 'online' | 'away' | 'offline';
    lastSeen?: string;
    department?: string;
}

interface ChatMessage {
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
    type: 'text' | 'file' | 'system';
}

interface ChatConversation {
    id: string;
    participants: ChatUser[];
    messages: ChatMessage[];
    unreadCount: number;
    lastMessage?: ChatMessage;
}

export function ChatWidget() {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    // Mock current user
    const currentUser: ChatUser = {
        id: 'current-user',
        name: 'You',
        status: 'online'
    };
    
    // Mock users data
    const users: ChatUser[] = [
        {
            id: '1',
            name: 'Sarah Johnson',
            avatar: undefined,
            status: 'online',
            department: 'Engineering'
        },
        {
            id: '2',
            name: 'Mike Wilson',
            avatar: undefined,
            status: 'away',
            lastSeen: '5 minutes ago',
            department: 'Marketing'
        },
        {
            id: '3',
            name: 'Emily Davis',
            avatar: undefined,
            status: 'offline',
            lastSeen: '2 hours ago',
            department: 'HR'
        },
        {
            id: '4',
            name: 'Ahmed Al-Rashid',
            avatar: undefined,
            status: 'online',
            department: 'Finance'
        }
    ];
    
    // Mock conversations
    const conversations: ChatConversation[] = [
        {
            id: '1',
            participants: [currentUser, users[0]],
            unreadCount: 2,
            messages: [
                {
                    id: '1',
                    senderId: '1',
                    content: 'Hi! Could you review the latest design changes?',
                    timestamp: new Date(Date.now() - 300000).toISOString(),
                    type: 'text'
                },
                {
                    id: '2',
                    senderId: '1',
                    content: 'I\'ve updated the user interface according to the feedback',
                    timestamp: new Date(Date.now() - 60000).toISOString(),
                    type: 'text'
                }
            ]
        },
        {
            id: '2',
            participants: [currentUser, users[1]],
            unreadCount: 0,
            messages: [
                {
                    id: '3',
                    senderId: 'current-user',
                    content: 'Thanks for the marketing report!',
                    timestamp: new Date(Date.now() - 3600000).toISOString(),
                    type: 'text'
                },
                {
                    id: '4',
                    senderId: '2',
                    content: 'You\'re welcome! Let me know if you need any clarifications.',
                    timestamp: new Date(Date.now() - 3500000).toISOString(),
                    type: 'text'
                }
            ]
        },
        {
            id: '3',
            participants: [currentUser, users[3]],
            unreadCount: 1,
            messages: [
                {
                    id: '5',
                    senderId: '4',
                    content: 'The budget proposal is ready for review',
                    timestamp: new Date(Date.now() - 7200000).toISOString(),
                    type: 'text'
                }
            ]
        }
    ];
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online':
                return 'bg-green-500';
            case 'away':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-400';
        }
    };
    
    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    
    const handleSendMessage = () => {
        if (!message.trim() || !selectedConversation) return;
        
        // In a real app, this would send the message to the server
        console.log('Sending message:', message);
        setMessage('');
    };
    
    const selectedConv = conversations.find(c => c.id === selectedConversation);
    const otherParticipant = selectedConv?.participants.find(p => p.id !== currentUser.id);
    
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.department && user.department.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedConversation]);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-md relative"
                >
                    <MessageCircle className="h-5 w-5" />
                    {totalUnread > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-red-500 text-white">
                            {totalUnread > 9 ? '9+' : totalUnread}
                        </Badge>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md p-0" side="right">
                <div className="flex h-full flex-col">
                    {!selectedConversation ? (
                        // Conversations List
                        <>
                            <SheetHeader className="p-4 border-b">
                                <SheetTitle className="flex items-center gap-2">
                                    <MessageCircle className="h-5 w-5" />
                                    {t('chat.messages')}
                                </SheetTitle>
                                <SheetDescription>
                                    {t('chat.chatWith')}
                                </SheetDescription>
                            </SheetHeader>
                            
                            {/* Search */}
                            <div className="p-4 border-b">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder={t('chat.searchConversations')}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            
                            <ScrollArea className="flex-1">
                                {/* Recent Conversations */}
                                <div className="p-2">
                                    <p className="text-xs font-medium text-muted-foreground mb-2 px-2">{t('chat.recent').toUpperCase()}</p>
                                    <div className="space-y-1">
                                        {conversations.map((conversation) => {
                                            const otherUser = conversation.participants.find(p => p.id !== currentUser.id);
                                            if (!otherUser) return null;
                                            
                                            return (
                                                <button
                                                    key={conversation.id}
                                                    onClick={() => setSelectedConversation(conversation.id)}
                                                    className="w-full p-3 text-left hover:bg-accent rounded-lg flex items-center gap-3"
                                                >
                                                    <div className="relative">
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                                                            <AvatarFallback>
                                                                {otherUser.name.split(' ').map(n => n[0]).join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <Circle className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 ${getStatusColor(otherUser.status)} rounded-full border-2 border-background`} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <p className="text-sm font-medium truncate">{otherUser.name}</p>
                                                            {conversation.lastMessage && (
                                                                <span className="text-xs text-muted-foreground">
                                                                    {formatTime(conversation.lastMessage.timestamp)}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            {conversation.lastMessage && (
                                                                <p className="text-xs text-muted-foreground truncate">
                                                                    {conversation.lastMessage.senderId === currentUser.id ? 'You: ' : ''}
                                                                    {conversation.lastMessage.content}
                                                                </p>
                                                            )}
                                                            {conversation.unreadCount > 0 && (
                                                                <Badge className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-primary">
                                                                    {conversation.unreadCount}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                
                                <Separator className="my-2" />
                                
                                {/* All Users */}
                                <div className="p-2">
                                    <p className="text-xs font-medium text-muted-foreground mb-2 px-2">{t('chat.teamMembers').toUpperCase()}</p>
                                    <div className="space-y-1">
                                        {filteredUsers.map((user) => (
                                            <button
                                                key={user.id}
                                                onClick={() => {
                                                    // Create or find conversation with this user
                                                    const existingConv = conversations.find(c => 
                                                        c.participants.some(p => p.id === user.id)
                                                    );
                                                    if (existingConv) {
                                                        setSelectedConversation(existingConv.id);
                                                    } else {
                                                        // In real app, create new conversation
                                                        console.log('Start new conversation with:', user.name);
                                                    }
                                                }}
                                                className="w-full p-3 text-left hover:bg-accent rounded-lg flex items-center gap-3"
                                            >
                                                <div className="relative">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={user.avatar} alt={user.name} />
                                                        <AvatarFallback>
                                                            {user.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <Circle className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 ${getStatusColor(user.status)} rounded-full border-2 border-background`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">{user.name}</p>
                                                    <p className="text-xs text-muted-foreground">{user.department}</p>
                                                    {user.status === 'offline' && user.lastSeen && (
                                                        <p className="text-xs text-muted-foreground">Last seen {user.lastSeen}</p>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </ScrollArea>
                        </>
                    ) : (
                        // Chat View
                        selectedConv && otherParticipant && (
                            <>
                                {/* Chat Header */}
                                <div className="flex items-center justify-between p-4 border-b">
                                    <div className="flex items-center gap-3">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setSelectedConversation(null)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                        <div className="relative">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} />
                                                <AvatarFallback>
                                                    {otherParticipant.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <Circle className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 ${getStatusColor(otherParticipant.status)} rounded-full border border-background`} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{otherParticipant.name}</p>
                                            <p className="text-xs text-muted-foreground capitalize">
                                                {otherParticipant.status}
                                                {otherParticipant.status === 'offline' && otherParticipant.lastSeen && 
                                                    ` • Last seen ${otherParticipant.lastSeen}`
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="icon">
                                            <Phone className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Video className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Info className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                
                                {/* Messages */}
                                <ScrollArea className="flex-1 p-4">
                                    <div className="space-y-4">
                                        {selectedConv.messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`max-w-[70%] ${msg.senderId === currentUser.id ? 'order-2' : 'order-1'}`}>
                                                    <div
                                                        className={`rounded-lg px-3 py-2 text-sm ${
                                                            msg.senderId === currentUser.id
                                                                ? 'bg-primary text-primary-foreground'
                                                                : 'bg-muted'
                                                        }`}
                                                    >
                                                        {msg.content}
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {formatTime(msg.timestamp)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>
                                </ScrollArea>
                                
                                {/* Message Input */}
                                <div className="p-4 border-t">
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon">
                                            <Paperclip className="h-4 w-4" />
                                        </Button>
                                        <div className="flex-1 relative">
                                            <Input
                                                placeholder={t('chat.typeMessage')}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSendMessage();
                                                    }
                                                }}
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                                            >
                                                <Smile className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <Button 
                                            size="icon"
                                            onClick={handleSendMessage}
                                            disabled={!message.trim()}
                                        >
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}