// User Types
export enum Role {
    admin = "admin",
    host = "host",
    user = "user",
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    location?: string;
    profileImage?: string;
    bio?: string;
    interests?: string[];
    role: Role;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Event Types
export enum EventStatus {
    OPEN = "open",
    FULL = "full",
    CANCELLED = "cancelled",
    COMPLETED = "completed",
}

export interface IEvent {
    _id: string;
    name: string;
    type: string;
    date: Date | string;
    time: string;
    location: string;
    minParticipants: number;
    maxParticipants: number;
    description: string;
    profileImage?: string;
    joiningFee: number;
    status: EventStatus;
    host?: IUser | string;
    participants: (IUser | string)[];
    createdAt?: Date;
    updatedAt?: Date;
}

// Review Types
export interface IReview {
    _id: string;
    user: IUser | string;
    host: IUser | string;
    event: IEvent | string;
    rating: number;
    comment?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
}

// Form Types
export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    phone?: string;
    location?: string;
    file?: File;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface EventFormData {
    name: string;
    type: string;
    date: string;
    time: string;
    location: string;
    minParticipants: number;
    maxParticipants: number;
    description: string;
    joiningFee: number;
    file?: File;
}

export interface ProfileFormData {
    name: string;
    phone?: string;
    location?: string;
    bio?: string;
    interests?: string[];
    file?: File;
}

export interface ReviewFormData {
    rating: number;
    comment?: string;
}

// Navigation
export interface NavLink {
    href: string;
    label: string;
}

// Filter Types
export interface EventFilters {
    search?: string;
    type?: string;
    location?: string;
    dateFrom?: string;
    dateTo?: string;
}