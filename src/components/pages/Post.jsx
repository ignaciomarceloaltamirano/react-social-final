import { useParams } from 'react-router-dom';
import {
  useGetCommunities,
  useGetCommunityMembersCount,
  useGetPost,
} from '../../lib/react-query/queries';
import { Container, Grid, Stack } from '@mui/material';
import RecommendedWidget from '../RecommendedWidget';
import { useTheme } from '@emotion/react';
import AboutCommunityWidget from '../AboutCommunityWidget';
import Loader from '../Loader';
import Post from '../Post';

const PostPage = () => {
  const params = useParams();
  const theme = useTheme();
  const { data: post } = useGetPost(params?.postId);
  const { data, isLoading } = useGetCommunities();
  const recommended = data?.filter(
    (community) => community?.name != post?.communityName
  );

  const community = data?.find(
    (community) => community?.name === post?.communityName
  );
  const { data: membersCount } = useGetCommunityMembersCount(community?.id);

  return (
    <Container maxWidth='lg'>
      {isLoading ? (
        <Stack sx={{ mt: 4 }}>
          <Loader />
        </Stack>
      ) : (
        <Grid container columnSpacing={2}>
          <Grid item xs={12} md={8}>
            <Post post={post} withComment />
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <AboutCommunityWidget
                community={community}
                membersCount={membersCount}
              />
              {recommended?.length > 0 && (
                <RecommendedWidget communities={recommended} theme={theme} />
              )}
            </Stack>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default PostPage;
