import Link from 'next/link'
import {useFormik} from 'formik'
import * as yup from 'yup'

import {
  Container, 
  Box, Input, 
  Button, Text, FormControl,
  FormLabel, FormHelperText,  
  InputAddon,  InputRightAddon
} from '@chakra-ui/react'

import {Logo } from '../components'
import firebase from '../config/firebase'


const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail invalido!').required('Preenchimento obrigatorio!'),
  password: yup.string().required('Preenchimento obrigatorio!'),
})

export default function Home() {
  const {values, handleChange,
         errors,handleBlur,
         handleSubmit, touched, 
         isSubmitting
  } = useFormik({
    onSubmit: async (values, form) => { 
     
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(values.email, values.username)
        console.log(user);
        
      } catch (error) {
        console.log('ERROR :', error);
        
      }
    },
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
  
        <Box p={4}>
          <Button colorScheme="blue" width="100%" isLoading={isSubmitting} 
                  onClick={handleSubmit}>Entrar</Button>
        </Box>
      </box>
      <Link href="/signup">Ainda nao tem uma conta? Cadrastre-se.</Link>
  </Container>
  )
}
