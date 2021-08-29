import {useFormik} from 'formik'
import * as yup from 'yup'

import {
  Container, 
  Box, Input, 
  Button, Text, FormControl,
  FormLabel, FormHelperText, InputGroup, 
  InputAddon, InputLeftAddon, InputRightAddon
} from '@chakra-ui/react'

import {Logo } from './../components'

let schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});



const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail invalido!').required('Preenchimento obrigatorio!'),
  password: yup.string().required('Preenchimento obrigatorio!'),
  username: yup.string().required('Preenchimento obrigatorio!'),
})

export default function Home() {
  const {values, handleChange,
         errors,handleBlur,
         handleSubmit, touched, 
  } = useFormik({
    onSubmit: () => { },
    validationSchema,
    initialValues: {
      email:'',
      password:'',
      username:'',
    }
  })
  return (
    <Container p={4} centerContent>
      <Logo />
      <Box>
        <Text p={4} mt={8}>
          Crie sua agenda compartilhada
        </Text>
      </Box>

      <box>
        <FormControl id="email" p={4} isRequired>
          <FormLabel>
            Email
          </FormLabel>
          <Input type="email" value={values.email} onChange={handleChange} 
                 onBlur={handleBlur}/>
          {touched.email && <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText>}
        </FormControl>

        <FormControl id="password" p={4} isRequired>
          <FormLabel>
            Senha
          </FormLabel>
          <Input type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
          {touched.password && <FormHelperText textColor="#e74c3c">{errors.password}</FormHelperText>}
        </FormControl>
  
          <FormControl id="username" p={4} isRequired>
            <InputGroup size="lg">
              <InputLeftAddon children="clocker.work/"/>
              <Input type="username"  value={values.username} 
                   onChange={handleChange} onBlur={handleBlur}/>
            </InputGroup>
            {touched.username && <FormHelperText textColor="#e74c3c">{errors.username}</FormHelperText>}
          </FormControl>

        <Box p={4}>
          <Button colorScheme="blue" width="100%" onClick={handleSubmit}>Entrar</Button>
        </Box>
      </box>
  </Container>
  )
}
