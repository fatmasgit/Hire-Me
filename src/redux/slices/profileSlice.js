import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/firebaseConfig';
import { supabase } from '../../SuperBase/SuperBaseConfig';


// Thunk to fetch candidate data by UID (from auth.currentUser)
export const fetchCandidateByUid = createAsyncThunk(
  'candidateProfile/fetchCandidateByUid',
  async (_, { rejectWithValue }) => {
    const user = auth.currentUser;

    if (!user) {
      return rejectWithValue('No user is authenticated');

    }

    //console.log('User authenticated:', user.uid);

    const candidateDoc = doc(db, 'candidates', user.uid);
    try {
      const docSnapshot = await getDoc(candidateDoc);


      if (docSnapshot.exists()) {
        //   console.log('Candidate data found:', docSnapshot.data());
        return { id: docSnapshot.id, ...docSnapshot.data() };
      } else {
        return rejectWithValue('Candidate not found');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred while fetching data');

    }
  }
);






export const updateProfile = createAsyncThunk(
  'candidateProfile/updateProfile',
  async (
    {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      university,
      major,
      educationLevel,
      graduationYear,
      profilePhoto,
      cv
    },
    { rejectWithValue }
  ) => {
    const { uid } = auth.currentUser;

    let imageUrl = null;
    if (profilePhoto) {
      const isFile = profilePhoto instanceof File;

      if (isFile) {
        // If it's a file, process the upload
        const fileExt = profilePhoto.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `candidate-images/${fileName}`;

        try {
          // Upload profile photo to Supabase
          const { error: imageUploadError } = await supabase.storage
            .from('Candidate')
            .upload(filePath, profilePhoto, { cacheControl: '3600', upsert: false });

          if (imageUploadError) {
            return rejectWithValue(`Image upload failed: ${imageUploadError.message}`);
          }

          const { data: publicUrlData, error: imageUrlError } = supabase.storage
            .from('Candidate')
            .getPublicUrl(filePath);

          if (imageUrlError) {
            return rejectWithValue(`Failed to get image URL: ${imageUrlError.message}`);
          }

          imageUrl = publicUrlData.publicUrl;
        } catch (error) {
          return rejectWithValue(`Error uploading image: ${error.message}`);
        }
      } else {
        // If it's an image URL, don't upload, just use the existing URL
        imageUrl = profilePhoto;
      }
    }

    let cvUrl = null;
    if (cv) {
      const isFile = cv instanceof File;
      if (isFile) {
        const fileExt = cv.name.split('.').pop();
        const fileName = `${Date.now()}-cv.${fileExt}`;
        const filePath = `candidate-cvs/${fileName}`;

        try {
          // Upload CV to Supabase
          const { error: cvUploadError } = await supabase.storage
            .from('Candidate')
            .upload(filePath, cv, { cacheControl: '3600', upsert: false });

          if (cvUploadError) {
            return rejectWithValue(`CV upload failed: ${cvUploadError.message}`);
          }

          const { data: cvUrlData, error: cvUrlError } = supabase.storage
            .from('Candidate')
            .getPublicUrl(filePath);

          if (cvUrlError) {
            return rejectWithValue(`Failed to get CV URL: ${cvUrlError.message}`);
          }

          cvUrl = cvUrlData.publicUrl;
        } catch (error) {
          return rejectWithValue(`Error uploading CV: ${error.message}`);
        }
      } else {
        // If it's not a file, assume it's a URL (for example, a previously uploaded CV URL)
        cvUrl = cv;
      }
    }

    // Prepare the updated profile values
    const updatedValues = {
      firstName,
      lastName,
      email,
      dateOfBirth,
      university,
      major,
      educationLevel,
      graduationYear,
      imageUrl,
      cvUrl,
    };

    try {

      const candidateDocRef = doc(db, 'candidates', uid);
      await updateDoc(candidateDocRef, updatedValues);


      const docSnapshot = await getDoc(candidateDocRef);


      if (docSnapshot.exists()) {
        return { id: docSnapshot.id, ...docSnapshot.data() };

      } else {
        return rejectWithValue('Candidate not found after update');
      }
    } catch (error) {
      return rejectWithValue(`Error updating Firestore document: ${error.message}`);
    }
  }
);




const candidateProfileSlice = createSlice({
  name: 'candidateProfile',
  initialState: {
    candidate: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch candidate by UID
      .addCase(fetchCandidateByUid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidateByUid.fulfilled, (state, action) => {
        state.loading = false;
        state.candidate = action.payload;
      })
      .addCase(fetchCandidateByUid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.candidate = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default candidateProfileSlice.reducer;
