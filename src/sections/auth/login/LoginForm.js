import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import AuthContext from '../../../contexts/AuthContext';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  // login fields state
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(false);

  const authContext = useContext(AuthContext)

  const handleClick = () => {
    if (formFields.email === "abc@gmail.com" && formFields.password === "123456") {
      if (formFields.remember) {
        localStorage.setItem("authenticated", true);
      }

      authContext.setAuthenticated(true);
      navigate('/dashboard', { replace: true });
    } else {
      localStorage.setItem("authenticated", false);
      setAlert(true);
      authContext.setAuthenticated(false);

      setTimeout(() => {
        setAlert(false)
      }, 3000);
    }
  };

  // change form fields values
  const changeFormFields = (parameter, value) => {
    const items = { ...formFields };
    items[parameter] = value;
    setFormFields(items);
  }

  return (
    <>
      {alert ? <Alert severity="error">ایمیل یا رمز عبور اشتباه است!</Alert> : ""}
      <Stack spacing={3}>
        <TextField name="email" label="Email address" value={formFields.email} onChange={e => changeFormFields("email", e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formFields.password}
          onChange={e => changeFormFields("password", e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" value={formFields.remember}
          onChange={e => changeFormFields("remember", e.target.checked)} />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
