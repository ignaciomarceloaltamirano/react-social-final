import {
  Avatar,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  useGetUser,
  useGetUserDownVotedPosts,
  useGetUserPosts,
  useGetUserSavedPosts,
  useGetUserUpVotedPosts,
  useGetUsers,
} from '../../lib/react-query/queries';
import { Link, useParams } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import InfiniteScrollPosts from '../InfiniteScrollPosts';
import Loader from '../Loader';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getCurrentUser } from '../../services/auth.service';

const ProfilePage = () => {
  const params = useParams();
  const theme = useTheme();
  const currentUser = getCurrentUser();
  const [value, setValue] = useState('1');
  const { data: user } = useGetUser(params?.username);
  const { data } = useGetUsers();
  const {
    data: userPosts,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useGetUserPosts(user?.id);

  const {
    data: userUpVotedPosts,
    hasNextPage: upVotedPostsHasNextPage,
    fetchNextPage: upVotedPostsFetchNextPage,
    isLoading: upVotedPostsIsLoading,
  } = useGetUserUpVotedPosts(user?.id);

  const {
    data: userDownVotedPosts,
    hasNextPage: downVotedPostsHasNextPage,
    fetchNextPage: downVotedPostsFetchNextPage,
    isLoading: downVotedPostsIsLoading,
  } = useGetUserDownVotedPosts(user?.id);

  const {
    data: userSavedPosts,
    hasNextPage: savedPostsHasNextPage,
    fetchNextPage: savedPostsFetchNextPage,
    isLoading: savedPostsIsLoading,
  } = useGetUserSavedPosts();

  const total =
    userPosts?.pages.map((group) => group?.content).flatMap((p) => p.length) *
    userPosts?.pages.map((group) => group.totalPages);

  const users = data?.filter((u) => u.id != user?.id);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth='md'>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={8}>
          <Stack direction='row'>
            <IconButton sx={{ p: 0 }}>
              {user?.imageUrl !== null ? (
                <Avatar alt='Avatar' src={user?.imageUrl} />
              ) : (
                <AccountCircle sx={{ fontSize: '6rem' }} />
              )}
            </IconButton>
            <Stack sx={{ display: 'flex', justifyContent: 'center', ml: 1 }}>
              <Typography variant='h5'>
                <b>{user?.username}</b>
              </Typography>
              <Typography variant='body1'>@{user?.username}</Typography>
              <Typography variant='body1'>
                {total} {total > 1 ? 'Posts' : 'Post'}
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={{ mt: 1 }}>
            <TabContext value={value}>
              <Stack>
                <TabList onChange={handleChange}>
                  <Tab label='Posts' value='1' />
                  <Tab label='Upvoted Posts' value='2' />
                  <Tab label='Downvoted Posts' value='3' />
                  {currentUser?.id === user?.id && (
                    <Tab label='Saved Posts' value='4' />
                  )}
                </TabList>
              </Stack>
              <TabPanel value='1'>
                <Stack>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <InfiniteScrollPosts
                      data={userPosts}
                      fetchNextPage={fetchNextPage}
                      hasNextPage={hasNextPage}
                    />
                  )}
                </Stack>
              </TabPanel>
              <TabPanel value='2'>
                <Stack>
                  {upVotedPostsIsLoading ? (
                    <Loader />
                  ) : (
                    <InfiniteScrollPosts
                      data={userUpVotedPosts}
                      fetchNextPage={upVotedPostsFetchNextPage}
                      hasNextPage={upVotedPostsHasNextPage}
                    />
                  )}
                </Stack>
              </TabPanel>
              <TabPanel value='3'>
                <Stack>
                  {downVotedPostsIsLoading ? (
                    <Loader />
                  ) : (
                    <InfiniteScrollPosts
                      data={userDownVotedPosts}
                      fetchNextPage={downVotedPostsFetchNextPage}
                      hasNextPage={downVotedPostsHasNextPage}
                    />
                  )}
                </Stack>
              </TabPanel>
              {currentUser?.id === user?.id && (
                <TabPanel value={'4'}>
                  <Stack>
                    {savedPostsIsLoading ? (
                      <Loader />
                    ) : (
                      <InfiniteScrollPosts
                        data={userSavedPosts}
                        fetchNextPage={savedPostsFetchNextPage}
                        hasNextPage={savedPostsHasNextPage}
                      />
                    )}
                  </Stack>
                </TabPanel>
              )}
            </TabContext>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack
            direction='column'
            spacing={1}
            sx={{
              mt: 2,
              p: 2,
              border:
                theme.palette.mode === 'dark'
                  ? '1px solid #ffffff1f'
                  : '1px solid #0000001f',
            }}
          >
            <Typography>Other users</Typography>
            <Divider />
            {users?.map((user) => (
              <Stack key={user?.id} direction='row'>
                <IconButton sx={{ p: 0 }}>
                  {user?.imageUrl !== null ? (
                    <Avatar alt='Avatar' src={user?.imageUrl} />
                  ) : (
                    <AccountCircle sx={{ fontSize: '2rem' }} />
                  )}
                </IconButton>
                <Stack
                  sx={{ display: 'flex', justifyContent: 'center', ml: 1 }}
                >
                  <Link
                    className={
                      theme.palette.mode === 'light' ? 'light-mode-link' : ''
                    }
                    key={user.id}
                    to={`/users/${user.username}`}
                  >
                    <Typography variant='caption'>@{user.username}</Typography>
                  </Link>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
