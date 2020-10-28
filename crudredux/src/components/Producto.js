import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';

const Producto = ({ producto }) => {
    
    // destructuring de producto
    const { id, nombre, precio } = producto;
    
    const dispatch = useDispatch();
    const history = useHistory(); // Habilitar history para redireccion

    // Confirmar si desea eliminarlo
    const confimarEliminarProducto = id => {
        // preguntar al usuario
        Swal.fire({
            title: 'Estas seguro?',
            text:'Un producto que se elimina no se puede recuperar',
            icon:'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar',
            cancelButtonText:'Cancelar',
        }).then((result) => {
            if (result.value) {
                //pasarlo al action
                dispatch(borrarProductoAction(id));
            }
        });
    }

    // Funcion que redirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
        history.push(`/productos/editar/${producto.id}`);
    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}</span></td>
            <td className="acciones">
                <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={() => redireccionarEdicion(producto)}
                >
                    Editar
                </button>
                <button
                    type="submit"
                    className="btn btn-danger mr-2"
                    onClick={() => confimarEliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
     );
}
 
export default Producto;