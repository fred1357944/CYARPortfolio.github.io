export interface Student {
    id: number;
    name: string;
    advisor: string;
    title: string;
    category: string;
    year: string;
    shortDesc: string | number;
    description: string | number;
    image: string;
    heroImage: string;
    images: string[];
    profileImage: string;
}

export interface Category {
    id: string;
    label: string;
    desc: string;
    image: string;
}

export interface Event {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    image: string;
    highlights?: string[];
}

export interface Product {
    id: string;
    title: string;
    price: string;
    description: string;
    image: string;
    images: string[];
}

export interface Sponsor {
    name: string;
    logo: string;
    url: string;
}

export interface Settings {
    hero: {
        title: string;
        subtitle: string;
        deptUrl: string;
        image: string;
        logoSize: string;
        logoImage: string;
    };
    about: {
        title: string;
        content: string;
        image: string;
        date: string;
        location: string;
        locationUrl: string;
        mapUrl: string;
        hours: string;
        email: string;
    };
    social: {
        facebook: string;
        instagram: string;
    };
    sponsors: Sponsor[];
    categories: Category[];
    events: Event[];
    shop: {
        title: string;
        subtitle: string;
    };
    products: Product[];
    global: {
        profileRatio: string;
        favicon: string;
    };
}
