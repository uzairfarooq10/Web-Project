import { Fab, Grid } from '@material-ui/core';
import React from 'react';
import SingleProduct from './SingleProduct';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Pagination from '@material-ui/lab/Pagination';

import productService from '../../Services/ProductsService';
import userService from '../../Services/UserService';
const useStyles = makeStyles((theme) => ({
    addBtn: {
        position:"absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    } , 
    pagination: {
        marginTop: "15rem",

    },
  }));

  
const Products = (props) => {
    const [product, setProducts] = React.useState([]);

    const page = props.match.params.page? props.match.params.page : 1;

    const [total, setTotal] = React.useState(0);
    const getData = () => {
        productService.getProduct(page)
        .then((data) => {
            setProducts(data.product);
            setTotal(data.total);
        }).catch((error) => {
            console.log(error);
        })
    };
    // getData();
    const handleNewProductBtn = () => {
        console.log(props);
        props.history.push("/products/new");
    };
    const classes = useStyles();
    React.useEffect(getData, [page]);
    return (
        <div>
            <h1>Products</h1>
            {userService.isLoggedIn() && (<Fab onClick={handleNewProductBtn} color="primary" aria-label="add" className={classes.addBtn}>
                <AddIcon />
            </Fab>)}
            
            {/* <Fab color="secondary" aria-label="edit">
                <EditIcon />
            </Fab> */}
            {product.length === 0? <p>There are no Products</p>:
            <Grid container spacing={4}>
                {
                    product.map((product, index) => {
                        return <SingleProduct key={index} product={product} onDelete={getData} />
                    })
                }
            </Grid> }
            <Grid className={classes.pagination} container direction="column" justify="center" alignItems="center" item xs={12} >
                Total records : {total}
                <Pagination count={Math.ceil(total / 3)} color="secondary"
                onChange={(e,value) => {
                    props.history.push("/products/" + value);
                    // console.log(value);
                }} />
            </Grid>

        </div>
     );
}
 
export default Products;