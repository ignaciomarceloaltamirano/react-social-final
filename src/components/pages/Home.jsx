import {
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import CommunityModal from '../CommunityModal';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@emotion/react';
import {
  useGetCommunities,
  useGetSubscribedCommunityPosts,
  useGetTags,
} from '../../lib/react-query/queries';
import InfiniteScrollPosts from '../InfiniteScrollPosts';
import Loader from '../Loader';
import RecommendedWidget from '../RecommendedWidget';
import TagsWidget from '../TagsWidget';

const HomePage = () => {
  const theme = useTheme();
  const { data: tags } = useGetTags();
  const {
    data: subscribedCommunitiesPosts,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useGetSubscribedCommunityPosts();

  const { data: communities } = useGetCommunities();

  return (
    <Container maxWidth='lg'>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={8}>
          <Typography sx={{ mb: 2 }} variant='h4'>
            Feed
          </Typography>
          {isLoading ? (
            <Loader />
          ) : (
            <Stack>
              <InfiniteScrollPosts
                data={subscribedCommunitiesPosts}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
              />
            </Stack>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2} sx={{ mb: 2 }}>
            <Paper>
              <Stack sx={{ p: 2 }} spacing={1}>
                <Stack
                  direction='row'
                  spacing={1}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <HomeIcon />
                  <Typography variant='subtitle1' sx={{ lineHeight: 0 }}>
                    Home
                  </Typography>
                </Stack>
                <Typography variant='body2'>
                  Your personal homepage. Come here to check in with your
                  favorite communities.
                </Typography>
                <Divider />
                <CommunityModal feed />
              </Stack>
            </Paper>
            <Paper>
              {tags?.length > 0 && <TagsWidget tags={tags} theme={theme} />}
            </Paper>
            {communities?.length > 0 && (
              <RecommendedWidget communities={communities} theme={theme} />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
