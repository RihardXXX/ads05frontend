interface CardPreview {
    id: string;
    icon?: string | null;
    name: string;
    date: string;
    content: string;
    favorite: boolean;
    favoriteCount: number;
    messagesCount: number;
}

export default CardPreview;
