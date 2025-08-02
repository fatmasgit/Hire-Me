import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addJobToFirestore } from '../../redux/slices/employersSlice';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import JobDescription from './jobDescription';
import JobRequirements from './jobRequirements';
import JobTextFields from './JobTextFields';

const validationSchema = Yup.object({
  jobTitle: Yup.string()
    .min(3, 'Job title must be at least 3 characters')
    .matches(/^[A-Za-z\u0600-\u06FF\s]+$/, 'Job title must not contain numbers and must be in Arabic or English')
    .required('Job title is required'),
  workMode: Yup.string()
    .min(3, 'Work mode must be at least 3 characters')
    .matches(/^[A-Za-z\u0600-\u06FF\s]+$/, 'Work mode must not contain numbers and must be in Arabic or English')
    .required('Work mode is required'),
  companyName: Yup.string()
    .min(3, 'Company name must be at least 3 characters')
    .matches(/^[A-Za-z\u0600-\u06FF\s]+$/, 'Company name must not contain numbers and must be in Arabic or English')
    .required('Company name is required'),
  minSalary: Yup.number().required('Minimum salary is required').positive('Must be positive'),
  maxSalary: Yup.number().required('Maximum salary is required').positive('Must be positive'),
  jobCountry: Yup.string()
    .min(3, 'Job country must be at least 3 characters')
    .matches(/^[A-Za-z\u0600-\u06FF\s]+$/, 'Job country must not contain numbers and must be in Arabic or English')
    .required('Job country is required'),
  jobCity: Yup.string()
    .min(3, 'Job city must be at least 3 characters')
    .matches(/^[A-Za-z\u0600-\u06FF\s]+$/, 'Job city must not contain numbers and must be in Arabic or English')
    .required('Job city is required'),
  employmentType: Yup.string()
    .min(3, 'Employment type must be at least 3 characters')
    .required('Employment type is required'),
  salaryCurrency: Yup.string().required('Salary currency is required'),
  jobDescription: Yup.string(),
  jobRequirements: Yup.string(),
});

const theme = createTheme({
  palette: {
    purple: {
      main: '#4d2b7c',
    },
    darkPurple: {
      main: '#3B235D',
      contrastText: '#ffffff',
    },
  },
});

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const employmentTypes = [
  { value: 'full time', label: 'Full-time' },
  { value: 'part time', label: 'Part-time' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'freelance', label: 'Freelance' },
];

const currencies = [
  { value: 'EGP', label: 'EGP' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'AED', label: 'AED' },
];

const inputFields = [
  { id: 'jobTitle', label: 'Job Title', placeholder: 'Enter job title', type: 'text' },
  { id: 'workMode', label: 'Work Mode', placeholder: 'Enter work mode (Remote, On-site, Hybrid)', type: 'text' },
  { id: 'companyName', label: 'Company Name', placeholder: 'Enter company name', type: 'text' },
  { id: 'minSalary', label: 'Min Salary', placeholder: 'Enter minimum salary', type: 'number' },
  { id: 'maxSalary', label: 'Max Salary', placeholder: 'Enter maximum salary', type: 'number' },
  { id: 'jobCountry', label: 'Job Country', placeholder: 'Enter job country', type: 'text' },
  { id: 'jobCity', label: 'Job City', placeholder: 'Enter job city', type: 'text' },
  { id: 'employmentType', label: 'Employment Type', placeholder: 'Select employment type', type: 'select', options: employmentTypes },
  { id: 'salaryCurrency', label: 'Salary Currency', placeholder: 'Select currency', type: 'select', options: currencies },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function PostJob() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const direction = i18n.dir(i18n.language);
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full bg-[#FAFAFA] bg-colors bg-no-repeat">
        <ToastContainer position="top-center" autoClose={3000} closeOnClick rtl={direction === 'rtl'} />

        <Formik
          initialValues={{
            jobTitle: '',
            workMode: '',
            companyName: '',
            minSalary: '',
            maxSalary: '',
            jobCountry: '',
            jobCity: '',
            employmentType: employmentTypes[0].value,
            salaryCurrency: currencies[0].value,
            jobDescription: '',
            jobRequirements: '',
            jobImage: null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              //  console.log('Form data', values);
              await dispatch(addJobToFirestore(values)).unwrap();
              toast.success('Job posted successfully!');
              setTimeout(() => navigate('/Jobs'), 3500);
            } catch (err) {
              toast.error(`Error: ${err || 'An error occurred'}`);
            }
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <div className="pt-[5rem] pb-5 w-[80%] mx-auto h-full flex xs:flex-col md:flex-row md:flex-wrap justify-center items-center !gap-y-10 gap-x-10">
                <JobTextFields
                  inputFields={inputFields}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />

                <div className='w-[18rem]  md:w-[39rem]'>
                  <Box sx={{ bgcolor: 'background.paper', minHeight: '20rem' }}>
                    <AppBar position="static" color="darkPurple">
                      <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                      >
                        <Tab label="Job Description" {...a11yProps(0)} />
                        <Tab label="Job Requirements" {...a11yProps(1)} />
                      </Tabs>
                    </AppBar>
                    <TabPanel value={tabValue} index={0}>
                      <JobDescription name="jobDescription" value={values.jobDescription} onChange={setFieldValue} />
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                      <JobRequirements name="jobRequirements" value={values.jobRequirements} onChange={setFieldValue} />
                    </TabPanel>
                  </Box>
                </div>

                <div className="w-[18rem] md:!self-start">
                  <Button
                    fullWidth
                    color="darkPurple"
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Company Image
                    <VisuallyHiddenInput
                      type="file"
                      name="jobImage"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        setFieldValue('jobImage', file);
                      }}
                    />
                  </Button>
                </div>
              </div>

              <div className='flex w-full justify-center'>
                <Button
                  type="submit"
                  variant="contained"
                  color="darkPurple"
                  sx={{
                    width: '14rem',
                    height: '2.5rem',
                    textTransform: 'none',
                    fontSize: '1rem',
                    backgroundColor: '#4D2B7C',
                    borderRadius: '5px',
                  }}
                >
                  Post Job
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ThemeProvider>
  );
}
