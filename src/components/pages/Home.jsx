import { Container, Divider, Grid, Stack, Typography } from '@mui/material';
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
import { Link } from 'react-router-dom';

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
          <Stack
            direction='column'
            spacing={1}
            sx={{
              bgcolor: theme.palette.mode === 'light' && '#fff',
              borderRadius: '5px',
              border:
                theme.palette.mode === 'dark'
                  ? '1px solid #ffffff1f'
                  : '1px solid #0000001f',
              p: 2,
            }}
          >
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
              Your personal homepage. Come here to check in with your favorite
              communities.
            </Typography>
            <Divider />
            <CommunityModal feed />
          </Stack>
          <Stack
            direction='column'
            spacing={1}
            sx={{
              mt: 2,
              p: 2,
              bgcolor: theme.palette.mode === 'light' && '#fff',
              borderRadius: '5px',
              border:
                theme.palette.mode === 'dark'
                  ? '1px solid #ffffff1f'
                  : '1px solid #0000001f',
            }}
          >
            <Typography>Tags</Typography>
            <Divider />
            {tags?.map((tag) => (
              <Link
                className={
                  theme.palette.mode === 'light' ? 'light-mode-link' : ''
                }
                key={tag.id}
                to={`/tags/${tag.name}`}
              >
                <Typography>#{tag.name}</Typography>
              </Link>
            ))}
          </Stack>
          <RecommendedWidget communities={communities} theme={theme} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
