export interface MemoryItem {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'image';
  thumbnail: string;
  imageUrl: string;
  category: string;
  year: string;
  rowSection: string;
  isInMyList?: boolean;
}

export interface ContentRow {
  title: string;
  subtitle: string;
  items: MemoryItem[];
}

export const categories = [
  'To be Happy',
  'Travel',
  'Milestones',
  'Celebrations',
  'Everyday Love'
];

export const memories: { [key: string]: ContentRow[] } = {
  'Year 1': [
    {
      title: 'First Year Memories',
      subtitle: 'The beginning of everything',
      items: [
        {
          id: 1,
          title: 'First Date',
          description: '98% Match',
          type: 'video',
          thumbnail: 'to-pink-400',
          imageUrl: 'https://images.unsplash.com/photo-1518152006832-6a10e3e3e4c4?w=400&h=225&fit=crop',
          category: 'To be Happy',
          year: 'Year 1',
          rowSection: 'First Year Memories',
          isInMyList: false
        },
        {
          id: 2,
          title: 'Getting to Know Each Other',
          description: '2 Adventures',
          type: 'video',
          thumbnail: 'to-blue-500',
          imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=225&fit=crop',
          category: 'Everyday Love',
          year: 'Year 1',
          rowSection: 'First Year Memories',
          isInMyList: false
        },
        {
          id: 3,
          title: 'First Trip Together',
          description: '95% Match',
          type: 'video',
          thumbnail: 'to-green-400',
          imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0eb?w=400&h=225&fit=crop',
          category: 'Travel',
          year: 'Year 1',
          rowSection: 'First Year Memories',
          isInMyList: false
        }
      ]
    },
    {
      title: 'Early Adventures',
      subtitle: 'Exploring the world together',
      items: [
        {
          id: 4,
          title: 'Beach Day',
          description: 'Sun & Fun',
          type: 'video',
          thumbnail: 'to-cyan-400',
          imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=225&fit=crop',
          category: 'Travel',
          year: 'Year 1',
          rowSection: 'Early Adventures',
          isInMyList: false
        },
        {
          id: 5,
          title: 'Coffee Dates',
          description: 'Cozy',
          type: 'video',
          thumbnail: 'to-gray-600',
          imageUrl: 'https://images.unsplash.com/photo-1498834169557-1e0ab7b3f2c9?w=400&h=225&fit=crop',
          category: 'Everyday Love',
          year: 'Year 1',
          rowSection: 'Early Adventures',
          isInMyList: false
        },
        {
          id: 6,
          title: 'Movie Nights',
          description: 'Romantic',
          type: 'video',
          thumbnail: 'to-red-600',
          imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=225&fit=crop',
          category: 'To be Happy',
          year: 'Year 1',
          rowSection: 'Early Adventures',
          isInMyList: false
        }
      ]
    }
  ],
  'Year 2': [
    {
      title: 'Second Year Adventures',
      subtitle: 'Deeper connections',
      items: [
        {
          id: 7,
          title: 'Anniversary Celebration',
          description: 'Romance',
          type: 'video',
          thumbnail: 'to-red-600',
          imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=225&fit=crop',
          category: 'Celebrations',
          year: 'Year 2',
          rowSection: 'Second Year Adventures',
          isInMyList: false
        },
        {
          id: 8,
          title: 'Beach Getaway',
          description: 'Sun & Fun',
          type: 'video',
          thumbnail: 'to-cyan-400',
          imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=225&fit=crop',
          category: 'Travel',
          year: 'Year 2',
          rowSection: 'Second Year Adventures',
          isInMyList: false
        },
        {
          id: 9,
          title: 'Christmas Magic',
          description: 'Holiday',
          type: 'video',
          thumbnail: 'to-blue-600',
          imageUrl: 'https://images.unsplash.com/photo-1549417234-3d30f30e3d30?w=400&h=225&fit=crop',
          category: 'Celebrations',
          year: 'Year 2',
          rowSection: 'Second Year Adventures',
          isInMyList: false
        }
      ]
    },
    {
      title: 'Milestones',
      subtitle: 'Growing stronger together',
      items: [
        {
          id: 10,
          title: 'Meeting Family',
          description: '2 Episodes',
          type: 'video',
          thumbnail: 'to-purple-400',
          imageUrl: 'https://images.unsplash.com/photo-1511899346057-7f6e494f6e32?w=400&h=225&fit=crop',
          category: 'Milestones',
          year: 'Year 2',
          rowSection: 'Milestones',
          isInMyList: false
        },
        {
          id: 11,
          title: 'Moving In',
          description: '95% Match',
          type: 'video',
          thumbnail: 'to-green-400',
          imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0eb?w=400&h=225&fit=crop',
          category: 'Milestones',
          year: 'Year 2',
          rowSection: 'Milestones',
          isInMyList: false
        },
        {
          id: 12,
          title: 'First Fight',
          description: 'Drama',
          type: 'video',
          thumbnail: 'to-red-500',
          imageUrl: 'https://images.unsplash.com/photo-1532074205285-9e7d8c5e2e6b?w=400&h=225&fit=crop',
          category: 'Everyday Love',
          year: 'Year 2',
          rowSection: 'Milestones',
          isInMyList: false
        }
      ]
    }
  ],
  'Year 3': [
    {
      title: 'Third Year Journey',
      subtitle: 'Forever and always',
      items: [
        {
          id: 13,
          title: 'Propose Moment',
          description: 'Forever',
          type: 'video',
          thumbnail: 'to-pink-600',
          imageUrl: 'https://images.unsplash.com/photo-1516589178451-c3869f81051a?w=400&h=225&fit=crop',
          category: 'Milestones',
          year: 'Year 3',
          rowSection: 'Third Year Journey',
          isInMyList: false
        },
        {
          id: 14,
          title: 'Wedding Day',
          description: 'I Do',
          type: 'video',
          thumbnail: 'to-white',
          imageUrl: 'https://images.unsplash.com/photo-1519741493665-c77620e4b04c?w=400&h=225&fit=crop',
          category: 'Celebrations',
          year: 'Year 3',
          rowSection: 'Third Year Journey',
          isInMyList: false
        },
        {
          id: 15,
          title: 'New Year Kiss',
          description: 'Fireworks',
          type: 'video',
          thumbnail: 'to-purple-600',
          imageUrl: 'https://images.unsplash.com/photo-1516655837839-3dcdc5c2f8a7?w=400&h=225&fit=crop',
          category: 'Celebrations',
          year: 'Year 3',
          rowSection: 'Third Year Journey',
          isInMyList: false
        }
      ]
    },
    {
      title: 'Anniversary Celebrations',
      subtitle: 'Love that lasts',
      items: [
        {
          id: 16,
          title: '1 Year Anniversary',
          description: 'First of Many',
          type: 'video',
          thumbnail: 'to-red-500',
          imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=225&fit=crop',
          category: 'Celebrations',
          year: 'Year 3',
          rowSection: 'Anniversary Celebrations',
          isInMyList: false
        },
        {
          id: 17,
          title: '5 Year Anniversary',
          description: 'Stronger',
          type: 'video',
          thumbnail: 'to-gold-500',
          imageUrl: 'https://images.unsplash.com/photo-1522728841087-56b6f7a8c1f8?w=400&h=225&fit=crop',
          category: 'Celebrations',
          year: 'Year 3',
          rowSection: 'Anniversary Celebrations',
          isInMyList: false
        },
        {
          id: 18,
          title: 'Making Up',
          description: '99% Match',
          type: 'video',
          thumbnail: 'to-yellow-400',
          imageUrl: 'https://images.unsplash.com/photo-1516589178451-c3869f81051a?w=400&h=225&fit=crop',
          category: 'To be Happy',
          year: 'Year 3',
          rowSection: 'Anniversary Celebrations',
          isInMyList: false
        }
      ]
    }
  ]
};
