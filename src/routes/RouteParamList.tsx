import type {
  IPost,
  IVideoPost,
  MediaUri,
} from 'src/components/Social/PostList';

export type RootStackParamList = {
  Home: undefined;
  CommunityMemberDetail: {
    communityId: string;
  };
  CommunitySetting: {
    communityId: string;
    communityName: string;
  };
  CommunityList: {
    categoryId: string;
  };
  CommunityHome: undefined;
  MemberDetail: undefined;
  Community: undefined;
  Explore: undefined;
  CategoryList: undefined;
  CreatePost: undefined;
  PostDetail: {
    postDetail: IPost;
    initVideoPosts?: IVideoPost[];
    initImagePosts?: string[];
    initVideoPostsFullSize?: MediaUri[];
    initImagePostsFullSize?: MediaUri[];
  };
  UserProfile: {
    userId: string;
  };
  UserProfileSetting: {
    userId: string;
    follow: string;
  };
  EditProfile: {
    userId: string;
  };
};
