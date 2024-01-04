import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { getCurrentUser } from '../../services/auth.service';
import { AccountCircle } from '@mui/icons-material';
import CreatePostModal from '../CreatePostModal';
import toast from 'react-hot-toast';
import {
  useGetCommunity,
  useGetCommunityMembersCount,
  useGetCommunityPosts,
  useGetSubscription,
  useSubscribe,
  useUnSubscribe,
} from '../../lib/react-query/queries';
import InfiniteScrollPosts from '../InfiniteScrollPosts';
import Loader from '../Loader';
import { useTheme } from '@emotion/react';
import AboutCommunityWidget from '../AboutCommunityWidget';
import CommunityModal from '../CommunityModal';

const CommunityPage = () => {
  const params = useParams();
  const user = getCurrentUser();
  const theme = useTheme();

  const {
    data: community,
    isLoading: isLoadingCommunity,
    error: communityError,
  } = useGetCommunity(params?.communityName);

  const {
    data: communityPosts,
    fetchNextPage,
    hasNextPage,
  } = useGetCommunityPosts(community);

  const {
    data: membersCount,
    isLoading: isLoadingMembersCount,
    error: membersCountError,
  } = useGetCommunityMembersCount(community?.id);

  const { mutateAsync: subscribe } = useSubscribe();
  const { mutateAsync: unSubscribe } = useUnSubscribe(community?.id);
  const { data: isSubscribed, refetch } = useGetSubscription(community?.id);

  if (communityError) {
    return toast.error(communityError?.response.data.message);
  }

  if (membersCountError) {
    return toast.error(membersCountError?.response.data.message);
  }

  const handleSubscription = async () => {
    if (isSubscribed) {
      unSubscribe(community?.id);
    } else {
      subscribe(community?.id);
    }
    refetch();
  };

  return (
    <Container maxWidth='lg'>
      {isLoadingCommunity || isLoadingMembersCount ? (
        <Loader />
      ) : (
        <Grid container columnSpacing={2}>
          <Grid item xs={12} md={8}>
            <Stack direction='row' spacing={2}>
              <Typography variant='h4'>c/{community?.name}</Typography>
              <Button variant='contained' onClick={handleSubscription}>
                {isSubscribed ? 'Leave' : 'Join'}
              </Button>
              {user?.id === community?.creatorId && (
                <CommunityModal community={community} />
              )}
            </Stack>
            <Stack direction='row' spacing={1} sx={{ my: 2 }}>
              <Link to={`/users/${user?.username}`}>
                <IconButton>
                  {user?.imageUrl !== null ? (
                    <Avatar alt='Avatar' src={user?.imageUrl} />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
              </Link>
              <CreatePostModal />
            </Stack>
            <Stack>
              <InfiniteScrollPosts
                data={communityPosts}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} sx={{ mb: 2 }}>
            <AboutCommunityWidget
              community={community}
              theme={theme}
              membersCount={membersCount}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CommunityPage;
