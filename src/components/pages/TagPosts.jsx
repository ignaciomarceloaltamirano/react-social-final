/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Grid, Typography, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  useGetCommunities,
  useGetPostsByTag,
  useGetTags,
} from '../../lib/react-query/queries';
import InfiniteScrollPosts from '../InfiniteScrollPosts';
import Loader from '../Loader';
import RecommendedWidget from '../RecommendedWidget';
import { useTheme } from '@emotion/react';
import { useEffect } from 'react';
import TagsWidget from '../TagsWidget';

const TagPostsPage = () => {
  const params = useParams();
  const theme = useTheme();

  const {
    data: posts,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useGetPostsByTag(params?.tagName);

  const { data: communities } = useGetCommunities();
  const { data: tags } = useGetTags();

  useEffect(() => {
    refetch();
  }, [params?.tagName]);

  return (
    <Container maxWidth='lg'>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={8}>
          <Typography sx={{ mb: 2 }} variant='h4'>
            #{params?.tagName}
          </Typography>
          {isLoading ? (
            <Loader />
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
        <Grid item xs={12} md={4} sx={{ mb: 2 }}>
          <Stack spacing={2}>
            <TagsWidget tags={tags} theme={theme} />
            <RecommendedWidget communities={communities} theme={theme} />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TagPostsPage;
