import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'Your name must be atleast 2 characters'),
    instructions: yup.string(),
    pepperoni: yup.boolean(),
    green_pepper: yup.boolean(),
    sausage: yup.boolean(),
    pineapple: yup.boolean(),
    mushroom: yup.boolean(),
    size: yup.string()
})

export default function Form(){
    const [formState, setFormState] = useState({
        name: '',
        size: '',
        pepperoni: '',
        sausage: '',
        green_pepper: '',
        pineapple: '',
        mushroom: '',
        instructions: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        size: '',
        pepperoni: '',
        sausage: '',
        green_pepper: '',
        pineapple: '',
        mushroom: '',
        instructions: ''     
    })

    const [post,setPost] =useState([]);

    const inputChange = e => {
        e.persist();
        const newInputData = {
            ...formState,[e.target.name]:e.target.type === 'checkbox' ? e.target.checked : e.target.value
        };
        validateChange(e)
        setFormState(newInputData)
    }

    const formSubmit = e => {
        e.preventDefault();
        axios
        .post('https://reqres.in/api/users', formState)
        .then(res => {
            setPost(res.data);
            setFormState({
                name: '',
                size: '',
                pepperoni: '',
                sausage: '',
                green_pepper: '',
                pineapple: '',
                mushroom: '',
                instructions: ''  
            })
        }).catch(err => {
            console.log(err.res)
        })
    }

    const validateChange = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)

            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ''
                })
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                })
            })
    }

    return(
        <form onSubmit={formSubmit}>
            <label htmlFor='name'>
                Name
                <input
                    data-cy='name'
                    id='name'
                    type='text'
                    name='name'
                    value={formState.name}
                    onChange={inputChange}
                />
                {errors.name.length > 0 ? <p>{errors.name}</p>: null}
            </label>
            <label htmlFor='size'>
                Choice of Size
                <select id='size' name='size' onChange={inputChange}>
                    <option value ='' disabled selected hidden>Select</option>
                    <option value='small'>small</option>
                    <option value='medium'>medium</option>
                    <option value='large'>large</option>
                    <option value='extra-large'>extra large</option>
                </select>
                </label>
                <br></br>
            <label htmlFor='checkbox'>
                Add Toppings
                <fieldset>
                <label htmlFor='pepperoni'>
                    <input data-cy='pepperoni' type='checkbox' name='pepperoni' checked={formState.pepperoni} onChange={inputChange}/>
                    Pepperoni
                    </label>
                <label htmlFor='sausage'>
                    <input data-cy='sausage' type='checkbox' name='sausage' checked={formState.sausage} onChange={inputChange}/>
                    Sausage
                    </label>
                <label htmlFor='green_pepper'>
                    <input data-cy='green_pepper' type='checkbox' name='green_pepper' checked={formState.green_pepper} onChange={inputChange}/>
                    Green Pepper
                    </label>
                <label htmlFor='pineapple'>
                    <input data-cy='pineapple' type='checkbox' name='pineapple' checked={formState.pineapple} onChange={inputChange}/>
                    Pineapple
                    </label>
                <label htmlFor='mushroom'>
                    <input data-cy='mushroom' type='checkbox' name='mushroom' checked={formState.mushroom} onChange={inputChange}/>
                    Mushroom
                    </label> 
            </fieldset>
            </label>
            <label htmlFor='instructions'>Special Instructions<br></br>
                <textarea
                data-cy='instructions'
                id='instructions'
                name='instructions'
                value={formState.instructions}
                onChange={inputChange}
                />
            </label>
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button data-cy='button'>Order</button>
        </form>
    )
}