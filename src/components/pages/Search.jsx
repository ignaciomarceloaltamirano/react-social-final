import { useLocation } from 'react-router-dom';
import {
  useGetCommunities,
  useGetTags,
  useSearchPosts,
} from '../../lib/react-query/queries';
import { Container, Stack, Typography, Grid } from '@mui/material';
import Loader from '../Loader';
import InfiniteScrollPosts from '../InfiniteScrollPosts';
import RecommendedWidget from '../RecommendedWidget';
import { useTheme } from '@emotion/react';
import TagsWidget from '../TagsWidget';

const SearchPage = () => {
  const theme = useTheme();
  const location = useLocation();
  const queryParams = new URLSearchParams(location?.search);
  const query = queryParams.get('query');
  const { data: communities } = useGetCommunities();
  const { data: tags } = useGetTags();
  const {
    data: posts,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useSearchPosts(query);

  const arePostsFound =
    posts?.pages.map((group) => group.content).flatMap((c) => c.length) > 0;
  return (
    <Container maxWidth='lg'>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={8}>
          <Typography sx={{ mb: 2 }} variant='h4'>
            Search for {`"${query}"`}
          </Typography>
          {isLoading ? (
            <Loader />
          ) : !arePostsFound ? (
            <Typography sx={{ my: 2 }} variant='h5' align='center'>
              No posts found.
            </Typography>
          ) : (
            <Stack>
              <InfiniteScrollPosts
                data={posts}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
              />
            </Stack>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2} sx={{ mb: 2 }}>
            {tags?.length > 0 && <TagsWidget tags={tags} theme={theme} />}
            {communities?.length > 0 && (
              <RecommendedWidget communities={communities} theme={theme} />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchPage;
