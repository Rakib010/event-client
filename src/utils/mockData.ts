import {
    Calendar,
    MapPin,
    Users,
    Music,
    Mountain,
    Gamepad2,
    Palette,
    Coffee,
    Utensils,
    Camera,
} from 'lucide-react'

export const categories = [
    {
        id: '1',
        name: 'Music',
        icon: Music,
        color: 'bg-rose-100 text-rose-600',
        count: 124,
    },
    {
        id: '2',
        name: 'Outdoors',
        icon: Mountain,
        color: 'bg-emerald-100 text-emerald-600',
        count: 85,
    },
    {
        id: '3',
        name: 'Gaming',
        icon: Gamepad2,
        color: 'bg-violet-100 text-violet-600',
        count: 56,
    },
    {
        id: '4',
        name: 'Art',
        icon: Palette,
        color: 'bg-amber-100 text-amber-600',
        count: 42,
    },
    {
        id: '5',
        name: 'Social',
        icon: Coffee,
        color: 'bg-blue-100 text-blue-600',
        count: 98,
    },
    {
        id: '6',
        name: 'Food',
        icon: Utensils,
        color: 'bg-orange-100 text-orange-600',
        count: 67,
    },
    {
        id: '7',
        name: 'Photography',
        icon: Camera,
        color: 'bg-cyan-100 text-cyan-600',
        count: 34,
    },
]

export const users = [
    {
        id: 'u1',
        name: 'Sarah Jenkins',
        role: 'host',
        avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        rating: 4.9,
        reviews: 124,
        location: 'San Francisco, CA',
        bio: 'Passionate about hiking and outdoor adventures. I love organizing group trips to explore nature.',
        interests: ['Hiking', 'Photography', 'Camping'],
    },
    {
        id: 'u2',
        name: 'Michael Chen',
        role: 'host',
        avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        rating: 4.8,
        reviews: 89,
        location: 'New York, NY',
        bio: 'Board game enthusiast and tech lover. Organizing weekly game nights and tech meetups.',
        interests: ['Gaming', 'Technology', 'Board Games'],
    },
    {
        id: 'u3',
        name: 'Emily Wilson',
        role: 'user',
        avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        rating: 5.0,
        reviews: 12,
        location: 'Austin, TX',
        bio: 'New in town, looking to meet people and explore the local music scene.',
        interests: ['Music', 'Art', 'Social'],
    },
]

export const events = [
    {
        id: 'e1',
        title: 'Sunset Hiking Adventure',
        category: 'Outdoors',
        date: '2023-11-15',
        time: '17:00',
        location: 'Golden Gate Park, SF',
        image:
            'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 15,
        host: users[0],
        participants: 8,
        maxParticipants: 12,
        description:
            'Join us for a beautiful sunset hike through Golden Gate Park. We will explore hidden trails and enjoy breathtaking views of the city. Perfect for beginners and intermediate hikers.',
        status: 'open',
    },
    {
        id: 'e2',
        title: 'Board Game Night',
        category: 'Gaming',
        date: '2023-11-18',
        time: '19:00',
        location: 'The Game Cafe, NY',
        image:
            'https://images.unsplash.com/photo-1610890716171-6b1c9f2bdabf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 5,
        host: users[1],
        participants: 4,
        maxParticipants: 6,
        description:
            'Weekly board game night! We will be playing Catan, Ticket to Ride, and other strategy games. All skill levels welcome. Snacks provided.',
        status: 'open',
    },
    {
        id: 'e3',
        title: 'Jazz & Wine Evening',
        category: 'Music',
        date: '2023-11-20',
        time: '20:00',
        location: 'Blue Note Jazz Club',
        image:
            'https://images.unsplash.com/photo-1514525253440-b393452e8d26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 35,
        host: users[0],
        participants: 12,
        maxParticipants: 20,
        description:
            'Experience an evening of smooth jazz and fine wine. We have reserved a private section for our group. Price includes first glass of wine.',
        status: 'full',
    },
    {
        id: 'e4',
        title: 'Street Photography Walk',
        category: 'Photography',
        date: '2023-11-22',
        time: '10:00',
        location: 'Downtown District',
        image:
            'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 0,
        host: users[1],
        participants: 15,
        maxParticipants: 20,
        description:
            'Bring your camera and join us for a street photography walk. We will focus on capturing urban life and architecture. Tips and tricks shared.',
        status: 'open',
    },
    {
        id: 'e5',
        title: 'Pottery Workshop',
        category: 'Art',
        date: '2023-11-25',
        time: '14:00',
        location: 'Creative Arts Studio',
        image:
            'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 45,
        host: users[0],
        participants: 6,
        maxParticipants: 8,
        description:
            'Learn the basics of pottery in this hands-on workshop. You will create your own bowl or mug. All materials and firing included.',
        status: 'open',
    },
    {
        id: 'e6',
        title: 'Sunday Brunch Social',
        category: 'Food',
        date: '2023-11-26',
        time: '11:00',
        location: 'Garden Bistro',
        image:
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        price: 25,
        host: users[1],
        participants: 10,
        maxParticipants: 10,
        description:
            'Meet new friends over a delicious brunch. Great conversation and good food guaranteed. Vegetarian options available.',
        status: 'full',
    },
]

export const testimonials = [
    {
        id: 't1',
        user: 'Alex Johnson',
        role: 'User',
        avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        content:
            "I moved to a new city and didn't know anyone. Through this platform, I found a hiking group and made amazing friends!",
        rating: 5,
    },
    {
        id: 't2',
        user: 'Maria Garcia',
        role: 'Host',
        avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        content:
            'Hosting events has been so rewarding. The platform makes it easy to manage participants and payments. Highly recommend!',
        rating: 5,
    },
    {
        id: 't3',
        user: 'David Kim',
        role: 'User',
        avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        content:
            "The variety of activities is incredible. From board games to concerts, there's always something fun to do.",
        rating: 4,
    },
]
