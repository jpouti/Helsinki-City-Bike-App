import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

type SearchProps = {
    handleSearchChange: (
        newSearch: string | null,
    ) => void,
    placeholder: string
}

const Search:React.FC<SearchProps> = ({ handleSearchChange, placeholder }) => {

    const [value, setValue] = useState<string | null>(null)

    const valueChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField id='outlined-search' label='Search Field' type='search' placeholder={placeholder} onChange={valueChangeHandler} />
            <Button onClick={() => handleSearchChange(value)}>Search</Button>
        </Box>
    )
}

export default Search