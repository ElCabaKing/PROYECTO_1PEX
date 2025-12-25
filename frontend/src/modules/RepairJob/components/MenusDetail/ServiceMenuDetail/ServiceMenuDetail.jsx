
import styles from '../../MenusDetail/MenuDetail.module.css'
import useServicio from '../../../../Servicio/hooks/useServicio'
import Buttom from '../../../../../components/Buttom/Buttom';
import Input from '../../../../../components/Input/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useRef } from 'react';
import useRepairDetail from '../../ModalRepairDetail/useRepairDetail';
function ServiceMenuDetail({ cancel, repair_id, refresh }) {
    const isFirstNameRender = useRef(true);
    const { serviceList, getServiceListFunc, getServiceListbyNameFunc,
        index, maxIndex, serviceName, setServiceName, setIndex } = useServicio();

    const { saveServiceDetailfunc } = useRepairDetail()

    useEffect(() => {
        if (serviceName !== "") return
        getServiceListFunc()

    }, [index, serviceName]);

    useEffect(() => {
        if (isFirstNameRender.current) {
            isFirstNameRender.current = false;
            return;
        }
        if (serviceName != "") {
            getServiceListbyNameFunc();
        }
    }, [index, serviceName]);

    return (
        <>
            <h3>Ingresar Servicio</h3>
            <div className={styles.upThings} >
                <Buttom extraClass={styles.addButton} action={() => cancel(false)} label="Cancelar"></Buttom>
                <Input value={serviceName} onChange={(e) => setServiceName(e.target.value)}></Input>
                <Select value={maxIndex.includes(index) ? index : ''} onChange={(e) => setIndex(e.target.value)}>
                    {maxIndex.map((n) => (<MenuItem value={n}>{n}</MenuItem>))}
                </Select>
            </div>
            <div className={styles.distContainer}>
                <div>
                    <table className={styles.tabla}>
                        <thead>
                            <tr>
                                <th>SERVICIO</th>
                                <th>PRECIO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceList.map((servicio) => (
                                <tr onDoubleClick={async () => { await saveServiceDetailfunc({ repair_id: repair_id, Sv_RpId: servicio.id }); refresh(repair_id); cancel(false) }} className={`${styles.fila} ${styles.noSelect}`} key={servicio.id}>
                                    <td>{servicio.service_nombre}</td>
                                    <td>{`$${servicio.service_value}`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ServiceMenuDetail