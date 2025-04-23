
import React from 'react'
import Home from './pages/Home'
import Edit from './pages/Edit'
import RootLayout from './layout/RootLayout'
import { Route, RouterProvider,createBrowserRouter,createRoutesFromElements } from 'react-router-dom'


const App = () => {
  
 const router = createBrowserRouter(createRoutesFromElements(

  <Route path= '/' element={<RootLayout/>}>
    <Route index element={<Home/>}/>
      <Route path ='edit' element={<Edit />}/>
      
      </Route>
 ))
  return (
    <>

    <RouterProvider router ={router}>
 
     </RouterProvider>
     </>

  )
}

export default App