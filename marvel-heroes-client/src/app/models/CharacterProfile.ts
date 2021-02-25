import { Comic } from './Comic';
import { Story } from './Story';

export interface CharacterProfile {
    name: string;
    imagePath:string;
    stories: Story[];
    comics: Comic[];
}