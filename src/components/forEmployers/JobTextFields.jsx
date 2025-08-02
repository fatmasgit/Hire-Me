import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const JobTextFields = ({ inputFields, values, handleChange, handleBlur, errors, touched }) => {
  return (
    <>
      {inputFields.map((field) => {
        if (field.type === 'select') {
          return (
            <FormControl
              key={field.id}
              sx={{
                width: '18rem',
                '& .MuiInputBase-input': {
                  fontSize: '0.8rem',
                  padding: '0 10px',
                  backgroundColor: 'transparent',
                },
                '& .MuiOutlinedInput-root': {
                  height: '45px',
                },
                '& .MuiSelect-icon': {
                  color: '#4d2b7c',
                },
                '& .MuiInputLabel-root': {
                  fontWeight: 600,
                },
                '& legend span': {
                  fontWeight: 600,
                },
              }}
              error={touched[field.id] && !!errors[field.id]}
              variant="outlined"
              color="purple"
              focused
            >
              <InputLabel id={field.id}>{field.label}</InputLabel>
              <Select
                labelId={field.id}
                id={field.id}
                name={field.id}
                value={values[field.id]}
                onChange={handleChange}
                onBlur={handleBlur}
                label={field.label}
              >
                {field.options.map((option, index) => (
                  <MenuItem key={index} value={option.value} sx={{ fontSize: '0.9rem' }}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {touched[field.id] && errors[field.id] && (
                <span style={{ color: '#d32f2f', fontSize: '0.75rem', marginTop: '3px' }}>
                  {errors[field.id]}
                </span>
              )}
            </FormControl>
          );
        } else {
          return (
            <TextField
              key={field.id}
              id={field.id}
              name={field.id}
              label={field.label}
              placeholder={field.placeholder}
              type={field?.type || 'text'}
              value={values[field.id]}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched[field.id] && !!errors[field.id]}
              helperText={touched[field.id] && errors[field.id]}
              variant="outlined"
              color="purple"
              focused
              sx={{
                width: '18rem',
                '& .MuiInputBase-input': {
                  fontSize: '0.8rem',
                  padding: '0 10px',
                  backgroundColor: 'transparent',
                },
                '& .MuiOutlinedInput-root': {
                  height: '45px',
                },
                '& .MuiInputLabel-root': {
                  fontWeight: 600,
                },
                '& legend span': {
                  fontWeight: 600,
                },
              }}
            />
          );
        }
      })}
    </>
  );
};

export default JobTextFields;
