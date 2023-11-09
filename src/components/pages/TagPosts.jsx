/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Grid, Typography, Stack, Divider } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
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
        <Grid item xs={12} md={4}>
          <Stack
            direction='column'
            spacing={2}
            sx={{
              p: 2,
              bgcolor: theme.palette.mode === 'light' && '#fff',
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

export default TagPostsPage;
