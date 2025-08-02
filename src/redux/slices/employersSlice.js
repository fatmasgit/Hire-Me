import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore';
import { auth, db } from "../../Firebase/firebaseConfig";
import { supabase } from '../../SuperBase/SuperBaseConfig';




// Async thunk to handle user signup
export const signupUser = createAsyncThunk(
  'employersSignUp/signupUser',
  async ({ name, email, profession, password, profileImage
  }, { rejectWithValue }) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // Process the profile photo
      let imageUrl = null;
      if (profileImage
      ) {
        const fileExt = profileImage
          .name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `Employers-images/${fileName}`;

        const { error: imageUploadError } = await supabase.storage
          .from('Employers')
          .upload(filePath, profileImage
            , { cacheControl: '3600', upsert: false });

        if (imageUploadError) {
          throw new Error(`Image upload failed: ${imageUploadError.message}`);
        }

        const { data: publicUrlData, error: imageUrlError } = supabase.storage
          .from('Employers')
          .getPublicUrl(filePath);

        if (imageUrlError) {
          throw new Error(`Failed to get image URL: ${imageUrlError.message}`);
        }

        imageUrl = publicUrlData.publicUrl;

      }

      // Save user data to Firestore
      const employersDoc = doc(db, 'employers', uid);
      await setDoc(employersDoc, {
        name,
        email,
        profession,
        imageUrl,
      });

      return { uid, name, email, profession, imageUrl };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);






// Async thunk to handle user login
export const loginUser = createAsyncThunk(
  'employersSignUp/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // Fetch user data from Firestore after login
      const employersDoc = doc(db, 'employers', uid);
      const docSnap = await getDoc(employersDoc);

      if (docSnap.exists()) {
        return {
          uid,
          message: 'Login successful!',
          ...docSnap.data()
        };
      } else {
        throw new Error('No such user!');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);






//sign in with google
export const loginWithGoogle = createAsyncThunk(
  'employersSignUp/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const { uid, email, displayName } = userCredential.user;

      // Return user details including displayName
      return { uid, email, displayName, message: 'Login successful!' };
    } catch (error) {

      return rejectWithValue(error.message);
    }
  }
);







// Async thunk to add a job to Firestore
export const addJobToFirestore = createAsyncThunk(
  'employersSignUp/addJobToFirestore',
  async ({ jobTitle, workMode, companyName, minSalary, maxSalary, jobCountry, jobCity,
    employmentType, salaryCurrency, jobDescription, jobRequirements, jobImage
  }, { rejectWithValue }) => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const { uid } = currentUser;
      let jobImageUrl = null;

      try {
        // Check if a job image is provided
        if (jobImage) {
          const fileExt = jobImage.name.split('.').pop();
          const fileName = `${Date.now()}.${fileExt}`;
          const filePath = `Job-images/${fileName}`;

          // Upload the job image to Supabase storage
          const { error: imageUploadError } = await supabase.storage
            .from('Employers')
            .upload(filePath, jobImage, { cacheControl: '3600', upsert: false });

          if (imageUploadError) {
            throw new Error(`Image upload failed: ${imageUploadError.message}`);
          }

          // Get the public URL of the uploaded image
          const { data: publicUrlData, error: imageUrlError } = supabase.storage
            .from('Employers')
            .getPublicUrl(filePath);

          if (imageUrlError) {
            throw new Error(`Failed to get image URL: ${imageUrlError.message}`);
          }

          jobImageUrl = publicUrlData.publicUrl;
        }

        // Add the new job to the "jobs" collection in Firestore
        const jobRef = collection(db, 'jobs');
        const newJob = {
          employerId: uid,
          jobTitle: jobTitle.toLowerCase(),
          workMode: workMode.toLowerCase(),
          jobType: employmentType.toLowerCase(),
          companyName: companyName.toLowerCase(),
          jobLocation: { country: jobCountry.toLowerCase(), city: jobCity.toLowerCase() },
          salaryRange: { min: minSalary, max: maxSalary },
          jobDescription,
          jobRequirements,
          companyImage: jobImageUrl,
          salaryCurrency: salaryCurrency.toLowerCase()

        };

        // Add the new job to Firestore
        await addDoc(jobRef, newJob);
        //   console.log('Job added to Firestore!');
      } catch (error) {
        return rejectWithValue(error.message);
      }
    } else {
      return rejectWithValue('No user is authenticated');
    }
  }
);








// Redux slice
const employersSignUpSlice = createSlice({
  name: 'employersSignUp',
  initialState: {
    user: null,
    formLoading: false,      // For form login/signup
    googleLoading: false,   // For Google login
    error: null,
    message: null,
    loading: null,
    jobLoading: false,   // Loading state for job posting
    jobError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.formLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.formLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.formLoading = false;
        state.error = action.payload;
      })

      .addCase(loginWithGoogle.pending, (state) => {
        state.googleLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.googleLoading = false;
        state.user = action.payload;
        state.message = action.payload.message;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.googleLoading = false;
        state.error = action.payload;
        state.message = null;
      })


      //postJob
      .addCase(addJobToFirestore.pending, (state) => {
        state.jobLoading = true;
        state.jobError = null;
      })
      .addCase(addJobToFirestore.fulfilled, (state, action) => {
        state.jobLoading = false;
      })
      .addCase(addJobToFirestore.rejected, (state, action) => {
        state.jobLoading = false;
        state.jobError = action.payload;
      })

  },
});

export default employersSignUpSlice.reducer;
