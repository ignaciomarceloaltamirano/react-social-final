/* eslint-disable react/prop-types */
import {
  Button,
  Divider,
  FormLabel,
  IconButton,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
  useCreateCommunity,
  useDeleteCommunity,
  useUpdateCommunity,
} from '../lib/react-query/queries';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { zodResolver } from '@hookform/resolvers/zod';
import { communitySchema } from '../lib/zod/validations';
import { useTheme } from '@emotion/react';

const CreateOrUpdateCommunityModal = ({ feed, community }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(communitySchema) });

  const {
    mutateAsync: createCommunity,
    isSuccess: isSuccessCreate,
    isPending: isPendingCreate,
  } = useCreateCommunity();
  const {
    mutateAsync: updateCommunity,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdate,
  } = useUpdateCommunity();
  const { mutateAsync: deleteCommunity } = useDeleteCommunity();

  const onSubmit = async (data) => {
    if (community) {
      updateCommunity({ communityId: community?.id, name: data.name });
      navigate(`/communities/${data.name}`);
    } else {
      createCommunity(data);
    }

    if (isSuccessCreate || isSuccessUpdate) {
      reset();
    }
    handleClose();
  };

  const handleDeleteCommunity = async () => {
    deleteCommunity(community?.id);
  };

  return (
    <>
      {feed ? (
        <Button variant='contained' onClick={handleOpen}>
          Create Community
        </Button>
      ) : community ? (
        <Stack
          direction='row'
          spacing={1}
          sx={{ display: 'flex', width: '100%', justifyContent: 'end' }}
        >
          <IconButton
            onClick={handleOpen}
            sx={{
              bgcolor: 'primary.main',
              borderRadius: '5px',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#7789b2',
              },
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={handleDeleteCommunity}
            sx={{
              bgcolor: 'primary.main',
              borderRadius: '5px',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#7789b2',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ) : (
        <MenuItem onClick={handleOpen}>Create Community</MenuItem>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
            <Typography sx={{ mb: 1 }} variant='h6' component='h2'>
              {community ? 'Update' : 'Create'} community
            </Typography>
            <Divider />
            <FormLabel sx={{ my: 2 }}>Name</FormLabel>
            <TextField
              {...register('name')}
              size='small'
              defaultValue={community?.name || ''}
              fullWidth
              onKeyDown={(e) => {
                if (e.key === 'a' || e.key === 's') {
                  e.stopPropagation();
                }
              }}
            />
            {errors.name && (
              <Typography
                variant='subtitle2'
                sx={{ mt: 2, color: theme.palette.error.main }}
              >
                {errors.name.message}
              </Typography>
            )}
            <Button
              sx={{ alignSelf: 'start', mt: 2 }}
              type='submit'
              variant='contained'
              disabled={isPendingCreate || isPendingUpdate}
            >
              {isPendingCreate || isPendingUpdate
                ? 'Loading...'
                : community
                ? 'Update'
                : 'Create'}
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default CreateOrUpdateCommunityModal;
