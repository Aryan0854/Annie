export interface MemoryItem {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'image';
  thumbnail: string;
  imageUrl: string;
  videoUrl?: string;
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

interface ProfileImage {
  name: string;
  imageUrl: string;
}

export const profileImages: ProfileImage[] = [
  { name: 'Year 1', imageUrl: '/media/images/year1-profile.jpg' },
  { name: 'Year 2', imageUrl: '/media/images/year2-profile.jpg' },
  { name: 'Year 3', imageUrl: '/media/images/year3-profile.jpg' },
];

export const categories = [
  'happy',
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
          title: "First Coffee Date",
          description: "A beautiful day to remember.",
          type: "video",
          thumbnail: "to-pink-400",
          imageUrl: "/media/thumbnails/1.png",
          videoUrl: "/media/videos/1.mp4",
          category: "Everyday Love",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 2,
          title: "Holi Together",
          description: "Moments like these last forever.",
          type: "video",
          thumbnail: "to-blue-500",
          imageUrl: "/media/thumbnails/2.png",
          videoUrl: "/media/videos/2.mp4",
          category: "happy",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 3,
          title: "Window View & Dreams",
          description: "Together is our favorite place to be.",
          type: "video",
          thumbnail: "to-green-400",
          imageUrl: "/media/thumbnails/3.png",
          videoUrl: "/media/videos/3.mp4",
          category: "Travel",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 4,
          title: "Rainy Hills Getaway",
          description: "Love you more every single day.",
          type: "video",
          thumbnail: "to-cyan-400",
          imageUrl: "/media/thumbnails/4.png",
          videoUrl: "/media/videos/4.mp4",
          category: "Milestones",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 5,
          title: "College Event Night",
          description: "Every moment with you is a blessing.",
          type: "video",
          thumbnail: "to-purple-400",
          imageUrl: "/media/thumbnails/5.png",
          videoUrl: "/media/videos/5.mp4",
          category: "Celebrations",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 6,
          title: "Study Session Together",
          description: "Building a lifetime of memories.",
          type: "video",
          thumbnail: "to-red-600",
          imageUrl: "/media/thumbnails/6.png",
          videoUrl: "/media/videos/6.mp4",
          category: "Everyday Love",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 7,
          title: "Quiet Moments",
          description: "Laughter, love, and happiness.",
          type: "video",
          thumbnail: "to-yellow-400",
          imageUrl: "/media/thumbnails/7.png",
          videoUrl: "/media/videos/7.mp4",
          category: "happy",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 8,
          title: "Friends & Memories",
          description: "A beautiful day to remember.",
          type: "image",
          thumbnail: "to-pink-400",
          imageUrl: "/media/images/100_2673.JPG",
          category: "Everyday Love",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 9,
          title: "Caught in the Moment",
          description: "Moments like these last forever.",
          type: "image",
          thumbnail: "to-blue-500",
          imageUrl: "/media/images/IMG-20221208-WA0013.jpg",
          category: "happy",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 10,
          title: "Focused on You",
          description: "Together is our favorite place to be.",
          type: "image",
          thumbnail: "to-green-400",
          imageUrl: "/media/images/IMG-20221221-WA0039.jpg",
          category: "Travel",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 11,
          title: "Campus Bench Talks",
          description: "Love you more every single day.",
          type: "image",
          thumbnail: "to-cyan-400",
          imageUrl: "/media/images/IMG-20221224-WA0002.jpg",
          category: "Milestones",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 12,
          title: "After-Class Conversations",
          description: "Every moment with you is a blessing.",
          type: "image",
          thumbnail: "to-purple-400",
          imageUrl: "/media/images/IMG-20221224-WA0003.jpg",
          category: "Celebrations",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 13,
          title: "Holding Hands",
          description: "Building a lifetime of memories.",
          type: "image",
          thumbnail: "to-red-600",
          imageUrl: "/media/images/IMG-20230204-WA0132.jpg",
          category: "Everyday Love",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 14,
          title: "Mirror Selfie Together",
          description: "Laughter, love, and happiness.",
          type: "image",
          thumbnail: "to-yellow-400",
          imageUrl: "/media/images/IMG-20230316-WA0003.jpg",
          category: "happy",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 15,
          title: "Garden Date",
          description: "So grateful for us.",
          type: "image",
          thumbnail: "to-pink-400",
          imageUrl: "/media/images/IMG-20230316-WA0012.jpg",
          category: "Travel",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 16,
          title: "Late Night Calls",
          description: "A beautiful day to remember.",
          type: "image",
          thumbnail: "to-blue-500",
          imageUrl: "/media/images/IMG-20230401-WA0018.jpg",
          category: "Milestones",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 17,
          title: "Birthday Memories",
          description: "Moments like these last forever.",
          type: "image",
          thumbnail: "to-green-400",
          imageUrl: "/media/images/IMG-20230509-WA0000.jpg",
          category: "Celebrations",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
        {
          id: 18,
          title: "Mirror Moments",
          description: "Together is our favorite place to be.",
          type: "image",
          thumbnail: "to-cyan-400",
          imageUrl: "/media/images/IMG-20230509-WA0001.jpg",
          category: "Everyday Love",
          year: "Year 1",
          rowSection: "First Year Memories",
          isInMyList: false
        },
      ]
    },
    {
      title: 'Early Adventures',
      subtitle: 'Exploring the world together',
      items: [
        {
          id: 19,
          title: "Friends & Memories",
          description: "A beautiful day to remember.",
          type: "image",
          thumbnail: "to-pink-400",
          imageUrl: "/media/images/IMG-20230520-WA0011.jpg",
          category: "Everyday Love",
          year: "Year 1",
          rowSection: "Early Adventures",
          isInMyList: false
        },
        {
          id: 20,
          title: "Caught in the Moment",
          description: "Moments like these last forever.",
          type: "image",
          thumbnail: "to-blue-500",
          imageUrl: "/media/images/IMG20230127145956_1.jpg",
          category: "happy",
          year: "Year 1",
          rowSection: "Early Adventures",
          isInMyList: false
        },
        {
          id: 21,
          title: "Focused on You",
          description: "Together is our favorite place to be.",
          type: "image",
          thumbnail: "to-green-400",
          imageUrl: "/media/images/IMG_0304.jpg",
          category: "Travel",
          year: "Year 1",
          rowSection: "Early Adventures",
          isInMyList: false
        },
        {
          id: 22,
          title: "Campus Bench Talks",
          description: "Love you more every single day.",
          type: "image",
          thumbnail: "to-cyan-400",
          imageUrl: "/media/images/IMG_0920.jpg",
          category: "Milestones",
          year: "Year 1",
          rowSection: "Early Adventures",
          isInMyList: false
        },
        {
          id: 23,
          title: "After-Class Conversations",
          description: "Every moment with you is a blessing.",
          type: "image",
          thumbnail: "to-purple-400",
          imageUrl: "/media/images/IMG_20221205_221813_187.jpg",
          category: "Celebrations",
          year: "Year 1",
          rowSection: "Early Adventures",
          isInMyList: false
        },
        {
          id: 24,
          title: "Holding Hands",
          description: "Building a lifetime of memories.",
          type: "image",
          thumbnail: "to-red-600",
          imageUrl: "/media/images/IMG_20221215_062307_107.jpg",
          category: "Everyday Love",
          year: "Year 1",
          rowSection: "Early Adventures",
          isInMyList: false
        },
        {
          id: 25,
          title: "Mirror Selfie Together",
          description: "Laughter, love, and happiness.",
          type: "image",
          thumbnail: "to-yellow-400",
          imageUrl: "/media/images/IMG_20221217_182310_411.jpg",
          category: "happy",
          year: "Year 1",
          rowSection: "Early Adventures",
          isInMyList: false
        },
        {
          id: 26,
          title: "Garden Date",
          description: "So grateful for us.",
          type: "image",
          thumbnail: "to-pink-400",
          imageUrl: "/media/images/IMG_20221217_182313_347_1.jpg",
          category: "Travel",
          year: "Year 1",
          rowSection: "Early Adventures",
          isInMyList: false
        },
        {
          id: 27,
          title: "Late Night Calls",
          description: "A beautiful day to remember.",
          type: "image",
          thumbnail: "to-blue-500",
          imageUrl: "/media/images/IMG_20221217_182320_670_1.jpg",
          category: "Milestones",
          year: "Year 1",
          rowSection: "Early Adventures",
          isInMyList: false
        },
        {
          id: 28,
          title: "Birthday Memories",
          description: "Moments like these last forever.",
          type: "image",
          thumbnail: "to-green-400",
          imageUrl: "/media/images/IMG_20230110_025750_793.jpg",
          category: "Celebrations",
          year: "Year 1",
          rowSection: "Early Adventures",
          isInMyList: false
        },
        {
          id: 29,
          title: "Mirror Moments",
          description: "Together is our favorite place to be.",
          type: "image",
          thumbnail: "to-cyan-400",
          imageUrl: "/media/images/Snapchat-1474716912.jpg",
          category: "Everyday Love",
          year: "Year 1",
          rowSection: "Early Adventures",
          isInMyList: false
        },
        {
          id: 30,
          title: "Friends & Memories",
          description: "Love you more every single day.",
          type: "image",
          thumbnail: "to-purple-400",
          imageUrl: "/media/images/Snapchat-1851135302.jpg",
          category: "happy",
          year: "Year 1",
          rowSection: "Early Adventures",
          isInMyList: false
        },
      ]
    }
  ],
  'Year 2': [
    {
      title: 'Second Year Adventures',
      subtitle: 'Deeper connections',
      items: [
        {
          id: 31,
          title: "First Mirror Selfie",
          description: "A beautiful day to remember.",
          type: "video",
          thumbnail: "to-pink-400",
          imageUrl: "/media/thumbnails/8.png",
          videoUrl: "/media/videos/8.mp4",
          category: "Everyday Love",
          year: "Year 2",
          rowSection: "Second Year Adventures",
          isInMyList: false
        },
        {
          id: 32,
          title: "Sunset Ride",
          description: "Moments like these last forever.",
          type: "video",
          thumbnail: "to-blue-500",
          imageUrl: "/media/thumbnails/9.png",
          videoUrl: "/media/videos/9.mp4",
          category: "happy",
          year: "Year 2",
          rowSection: "Second Year Adventures",
          isInMyList: false
        },
        {
          id: 33,
          title: "Mirror Moments",
          description: "Together is our favorite place to be.",
          type: "video",
          thumbnail: "to-green-400",
          imageUrl: "/media/thumbnails/10.png",
          videoUrl: "/media/videos/10.mp4",
          category: "Travel",
          year: "Year 2",
          rowSection: "Second Year Adventures",
          isInMyList: false
        },
        {
          id: 34,
          title: "Birthday Night",
          description: "Love you more every single day.",
          type: "video",
          thumbnail: "to-cyan-400",
          imageUrl: "/media/thumbnails/11.png",
          videoUrl: "/media/videos/11.mp4",
          category: "Milestones",
          year: "Year 2",
          rowSection: "Second Year Adventures",
          isInMyList: false
        },
        {
          id: 35,
          title: "Sparklers & Smiles",
          description: "Every moment with you is a blessing.",
          type: "video",
          thumbnail: "to-purple-400",
          imageUrl: "/media/thumbnails/12.png",
          videoUrl: "/media/videos/12.mp4",
          category: "Celebrations",
          year: "Year 2",
          rowSection: "Second Year Adventures",
          isInMyList: false
        },
        {
          id: 36,
          title: "Concert Lights",
          description: "Building a lifetime of memories.",
          type: "video",
          thumbnail: "to-red-600",
          imageUrl: "/media/thumbnails/13.png",
          videoUrl: "/media/videos/13.mp4",
          category: "Everyday Love",
          year: "Year 2",
          rowSection: "Second Year Adventures",
          isInMyList: false
        },
        {
          id: 37,
          title: "Festival Vibes",
          description: "Laughter, love, and happiness.",
          type: "video",
          thumbnail: "to-yellow-400",
          imageUrl: "/media/thumbnails/14.png",
          videoUrl: "/media/videos/14.mp4",
          category: "happy",
          year: "Year 2",
          rowSection: "Second Year Adventures",
          isInMyList: false
        },
        {
          id: 38,
          title: "Circle of Friends",
          description: "A beautiful day to remember.",
          type: "image",
          thumbnail: "to-pink-400",
          imageUrl: "/media/images/100_2675.JPG",
          category: "Everyday Love",
          year: "Year 2",
          rowSection: "Second Year Adventures",
          isInMyList: false
        },
        {
          id: 39,
          title: "Yellow Wall Memories",
          description: "Moments like these last forever.",
          type: "image",
          thumbnail: "to-blue-500",
          imageUrl: "/media/images/IMG-20230708-WA0003.jpg",
          category: "happy",
          year: "Year 2",
          rowSection: "Second Year Adventures",
          isInMyList: false
        },
        {
          id: 40,
          title: "Stolen Kiss",
          description: "Together is our favorite place to be.",
          type: "image",
          thumbnail: "to-green-400",
          imageUrl: "/media/images/IMG-20230708-WA0004.jpg",
          category: "Travel",
          year: "Year 2",
          rowSection: "Second Year Adventures",
          isInMyList: false
        },
        {
          id: 41,
          title: "Dancing Together",
          description: "Love you more every single day.",
          type: "image",
          thumbnail: "to-cyan-400",
          imageUrl: "/media/images/IMG-20231017-WA0008.jpg",
          category: "Milestones",
          year: "Year 2",
          rowSection: "Second Year Adventures",
          isInMyList: false
        },
        {
          id: 42,
          title: "Eyes on You",
          description: "Every moment with you is a blessing.",
          type: "image",
          thumbnail: "to-purple-400",
          imageUrl: "/media/images/IMG-20240101-WA0051.jpg",
          category: "Celebrations",
          year: "Year 2",
          rowSection: "Second Year Adventures",
          isInMyList: false
        },
        {
          id: 43,
          title: "Date Night",
          description: "Building a lifetime of memories.",
          type: "image",
          thumbnail: "to-red-600",
          imageUrl: "/media/images/IMG-20240101-WA0055.jpg",
          category: "Everyday Love",
          year: "Year 2",
          rowSection: "Second Year Adventures",
          isInMyList: false
        },
        {
          id: 44,
          title: "A Quiet Evening",
          description: "Laughter, love, and happiness.",
          type: "image",
          thumbnail: "to-yellow-400",
          imageUrl: "/media/images/IMG-20240101-WA0067.jpg",
          category: "happy",
          year: "Year 2",
          rowSection: "Second Year Adventures",
          isInMyList: false
        },
        {
          id: 45,
          title: "Side by Side",
          description: "So grateful for us.",
          type: "image",
          thumbnail: "to-pink-400",
          imageUrl: "/media/images/IMG-20240101-WA0071.jpg",
          category: "Travel",
          year: "Year 2",
          rowSection: "Second Year Adventures",
          isInMyList: false
        },
        {
          id: 46,
          title: "Us, Unfiltered",
          description: "A beautiful day to remember.",
          type: "image",
          thumbnail: "to-blue-500",
          imageUrl: "/media/images/IMG-20240101-WA0088.jpg",
          category: "Milestones",
          year: "Year 2",
          rowSection: "Second Year Adventures",
          isInMyList: false
        },
      ]
    },
    {
      title: 'Milestones',
      subtitle: 'Growing stronger together',
      items: [
        {
          id: 47,
          title: "The Perfect Fit",
          description: "A beautiful day to remember.",
          type: "image",
          thumbnail: "to-pink-400",
          imageUrl: "/media/images/IMG-20240101-WA0097.jpg",
          category: "Everyday Love",
          year: "Year 2",
          rowSection: "Milestones",
          isInMyList: false
        },
        {
          id: 48,
          title: "Traditional Day",
          description: "Moments like these last forever.",
          type: "image",
          thumbnail: "to-blue-500",
          imageUrl: "/media/images/IMG-20240225-WA0007(1).jpg",
          category: "happy",
          year: "Year 2",
          rowSection: "Milestones",
          isInMyList: false
        },
        {
          id: 49,
          title: "Black & White Memories",
          description: "Together is our favorite place to be.",
          type: "image",
          thumbnail: "to-green-400",
          imageUrl: "/media/images/IMG-20240225-WA0008.jpg",
          category: "Travel",
          year: "Year 2",
          rowSection: "Milestones",
          isInMyList: false
        },
        {
          id: 50,
          title: "A Special Evening",
          description: "Love you more every single day.",
          type: "image",
          thumbnail: "to-cyan-400",
          imageUrl: "/media/images/IMG-20240225-WA0034.jpg",
          category: "Milestones",
          year: "Year 2",
          rowSection: "Milestones",
          isInMyList: false
        },
        {
          id: 51,
          title: "Matching Moments",
          description: "Every moment with you is a blessing.",
          type: "image",
          thumbnail: "to-purple-400",
          imageUrl: "/media/images/IMG-20240305-WA0031.jpg",
          category: "Celebrations",
          year: "Year 2",
          rowSection: "Milestones",
          isInMyList: false
        },
        {
          id: 52,
          title: "Coffee Conversations",
          description: "Building a lifetime of memories.",
          type: "image",
          thumbnail: "to-red-600",
          imageUrl: "/media/images/IMG20240115192132(1).jpg",
          category: "Everyday Love",
          year: "Year 2",
          rowSection: "Milestones",
          isInMyList: false
        },
        {
          id: 53,
          title: "Festival Glow",
          description: "Laughter, love, and happiness.",
          type: "image",
          thumbnail: "to-yellow-400",
          imageUrl: "/media/images/IMG_0486.jpg",
          category: "happy",
          year: "Year 2",
          rowSection: "Milestones",
          isInMyList: false
        },
        {
          id: 54,
          title: "Lost in Thought",
          description: "So grateful for us.",
          type: "image",
          thumbnail: "to-pink-400",
          imageUrl: "/media/images/IMG_20231113_100144.jpg",
          category: "Travel",
          year: "Year 2",
          rowSection: "Milestones",
          isInMyList: false
        },
        {
          id: 55,
          title: "Forever Us",
          description: "A beautiful day to remember.",
          type: "image",
          thumbnail: "to-blue-500",
          imageUrl: "/media/images/Snapchat-1568076328_1.jpg",
          category: "Milestones",
          year: "Year 2",
          rowSection: "Milestones",
          isInMyList: false
        },
        {
          id: 56,
          title: "Reflection",
          description: "Moments like these last forever.",
          type: "image",
          thumbnail: "to-green-400",
          imageUrl: "/media/images/Snapchat-2018677942.jpg",
          category: "Celebrations",
          year: "Year 2",
          rowSection: "Milestones",
          isInMyList: false
        },
      ]
    }
  ],
  'Year 3': [
    {
      title: 'Third Year Journey',
      subtitle: 'Forever and always',
      items: [
        {
          id: 57,
          title: "The Big Question",
          description: "A beautiful day to remember.",
          type: "video",
          thumbnail: "to-pink-400",
          imageUrl: "/media/thumbnails/15.png",
          videoUrl: "/media/videos/15.mp4",
          category: "Everyday Love",
          year: "Year 3",
          rowSection: "Third Year Journey",
          isInMyList: false
        },
        {
          id: 58,
          title: "Coffee & Conversations",
          description: "Moments like these last forever.",
          type: "video",
          thumbnail: "to-blue-500",
          imageUrl: "/media/thumbnails/16.png",
          videoUrl: "/media/videos/16.mp4",
          category: "happy",
          year: "Year 3",
          rowSection: "Third Year Journey",
          isInMyList: false
        },
        {
          id: 59,
          title: "New Year Together",
          description: "Together is our favorite place to be.",
          type: "video",
          thumbnail: "to-green-400",
          imageUrl: "/media/thumbnails/17.png",
          videoUrl: "/media/videos/17.MOV",
          category: "Travel",
          year: "Year 3",
          rowSection: "Third Year Journey",
          isInMyList: false
        },
        {
          id: 60,
          title: "Festival Lights",
          description: "Love you more every single day.",
          type: "video",
          thumbnail: "to-cyan-400",
          imageUrl: "/media/thumbnails/18.png",
          videoUrl: "/media/videos/18.MOV",
          category: "Milestones",
          year: "Year 3",
          rowSection: "Third Year Journey",
          isInMyList: false
        },
        {
          id: 61,
          title: "City of Lights",
          description: "Every moment with you is a blessing.",
          type: "video",
          thumbnail: "to-purple-400",
          imageUrl: "/media/thumbnails/19.png",
          videoUrl: "/media/videos/19.MOV",
          category: "Celebrations",
          year: "Year 3",
          rowSection: "Third Year Journey",
          isInMyList: false
        },
        {
          id: 62,
          title: "One Last Song",
          description: "Building a lifetime of memories.",
          type: "video",
          thumbnail: "to-red-600",
          imageUrl: "/media/thumbnails/20.png",
          videoUrl: "/media/videos/20.mp4",
          category: "Everyday Love",
          year: "Year 3",
          rowSection: "Third Year Journey",
          isInMyList: false
        },
        {
          id: 63,
          title: "Peace in Your Presence",
          description: "A beautiful day to remember.",
          type: "image",
          thumbnail: "to-pink-400",
          imageUrl: "/media/images/1729491055281.jpg",
          category: "Everyday Love",
          year: "Year 3",
          rowSection: "Third Year Journey",
          isInMyList: false
        },
        {
          id: 64,
          title: "Still Smiling",
          description: "Moments like these last forever.",
          type: "image",
          thumbnail: "to-blue-500",
          imageUrl: "/media/images/IMG20221216162540.jpg",
          category: "happy",
          year: "Year 3",
          rowSection: "Third Year Journey",
          isInMyList: false
        },
        {
          id: 65,
          title: "Our People",
          description: "Together is our favorite place to be.",
          type: "image",
          thumbnail: "to-green-400",
          imageUrl: "/media/images/IMG20240525203605.jpg",
          category: "Travel",
          year: "Year 3",
          rowSection: "Third Year Journey",
          isInMyList: false
        },
      ]
    },
    {
      title: 'Anniversary Celebrations',
      subtitle: 'Love that lasts',
      items: [
        {
          id: 66,
          title: "The Way You Look at Me",
          description: "A beautiful day to remember.",
          type: "image",
          thumbnail: "to-pink-400",
          imageUrl: "/media/images/IMG_0918(1).jpg",
          category: "Everyday Love",
          year: "Year 3",
          rowSection: "Anniversary Celebrations",
          isInMyList: false
        },
        {
          id: 67,
          title: "Our Favorite Mirror",
          description: "Moments like these last forever.",
          type: "image",
          thumbnail: "to-blue-500",
          imageUrl: "/media/images/Snapchat-1646899228.jpg",
          category: "happy",
          year: "Year 3",
          rowSection: "Anniversary Celebrations",
          isInMyList: false
        },
        {
          id: 68,
          title: "Home Is You",
          description: "Together is our favorite place to be.",
          type: "image",
          thumbnail: "to-green-400",
          imageUrl: "/media/images/Snapchat-307222778 (1).jpg",
          category: "Travel",
          year: "Year 3",
          rowSection: "Anniversary Celebrations",
          isInMyList: false
        },
      ]
    }
  ]
};
