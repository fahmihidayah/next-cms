export type Query = {
    q: string;
    page: number;
    limit: number;
}

export type Paginated<T> = {
    data: T[];
    page : number;
    total: number;
}