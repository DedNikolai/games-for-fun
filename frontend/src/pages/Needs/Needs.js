import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NeedItem from '../../components/NeedItem/NeedItem';
import BasicPagination from '../../components/Pagination/BasicPagination';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {getAllNeeds} from "../../store/actions/need";
import {getAllCategories} from "../../store/actions/category";
import {getAllRegions} from "../../store/actions/region";
import {connect} from 'react-redux';
import Preloader from '../../components/Preloader/Preloader';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function Needs(props) {
    const {needs, needsLoading, getNeeds, allCategories, categoriesLoading, 
        getCategories, getRegions, allRegions, regionsLoading} = props;
    const [regions, setRegion] = useState([]);
    const [categories, setCategories] = useState([]);
    const {content = [], number, totalPages, totalElements, size} = needs

    const handleChangePage = (event, page) => {
        getNeeds(regions, categories, page-1, 1);
    }

    const handleChangeRegion = (event) => {
        const {
            target: { value },
        } = event;
        setRegion(value);
    };

    const handleChangeCategory = (event) => {
        const {
            target: { value },
        } = event;
        setCategories(value);
    };

    const filterData = () => {
       getNeeds(regions, categories,)
    };

    const clearData = () => {
        setCategories([]);
        setRegion([]);
        getNeeds([], [], 0);
    }

    useEffect(() => {
        getNeeds(regions, categories, 0);
        getCategories();
        getRegions();
    }, []);

    if (needsLoading  || categoriesLoading  || regionsLoading) {
        return <Preloader/>
    }

    console.log('render')

    return (
        <Box sx={{ flexGrow: 1, marginTop: '30px', padding: '0 20px'}}>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={4}>
                        <FormControl sx={{ m: 1, width: '100%', margin: 0 }} size="small">
                            <InputLabel id="demo-multiple-checkbox-label">Region</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={regions}
                                onChange={handleChangeRegion}
                                input={<OutlinedInput label="Region" />}
                                renderValue={(selected) => selected.map(item => item.regionName).join(', ')}
                                MenuProps={MenuProps}
                            >
                                {allRegions.map((region) => (
                                    <MenuItem key={region.id} value={region}>
                                        <Checkbox checked={regions.some(item => item.id === region.id)} />
                                        <ListItemText primary={region.regionName} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <FormControl sx={{ m: 1, width: '100%', margin: 0 }} size="small">
                            <InputLabel id="demo-multiple-checkbox-label">Category</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={categories}
                                onChange={handleChangeCategory}
                                input={<OutlinedInput label="Categories" />}
                                renderValue={(selected) => selected.map(item => item.categoryName).join(', ')}
                                MenuProps={MenuProps}
                            >
                                {allCategories.map((category) => (
                                    <MenuItem key={category.id} value={category}>
                                        <Checkbox checked={categories.some(item => item.id === category.id)} />
                                        <ListItemText primary={category.categoryName} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} container spacing={2}>
                        <Grid item xs={8} sm={8} md={8}>
                                <Button
                                    variant="contained" 
                                    disableElevation
                                    size="large"
                                    color="secondary"
                                    onClick={filterData}
                                    sx={{width: '100%'}}
                                    endIcon={<FilterAltIcon />}
                                >
                                    Filter
                                </Button>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                                <Button
                                    variant="contained" 
                                    disableElevation
                                    size="large"
                                    color="secondary"
                                    onClick={clearData}
                                    sx={{width: '100%'}}
                                    endIcon={<FilterAltOffIcon />}
                                >
                                    Clear
                                </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginTop: '30px'}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {content.map((need, index) => (
                        <Grid item xs={12} sm={4} md={4} key={index}>
                            <NeedItem need={need}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {
                totalElements > size ?
                <Box sx={{ margin: '30px auto', textAlign: 'center'}}>
                <BasicPagination
                    count={totalPages}
                    page={number+1} 
                    onChane={handleChangePage}
                />
            </Box>
            :
            <></>
            }
            
        </Box>
    );
};

const mapStateToProps = ({need, categories, region}) => {
    return {
        needs: need.needs,
        needsLoading: need.needsLoading,
        allCategories: categories.categories,
        categoriesLoading: categories.categoriesLoading,
        allRegions: region.regions,
        regionsLoading: region.regionsLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getNeeds: (categories, regions, page, size) => dispatch(getAllNeeds(categories, regions, page, size)),
        getCategories: () => dispatch(getAllCategories()),
        getRegions: () => dispatch(getAllRegions())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Needs);
