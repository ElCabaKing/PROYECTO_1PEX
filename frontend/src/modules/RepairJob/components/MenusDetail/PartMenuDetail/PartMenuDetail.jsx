import styles from '../../MenusDetail/MenuDetail.module.css'
import useParts from '../../../../Repuesto/hooks/useParts'
import Buttom from '../../../../../components/Buttom/Buttom';
import Input from '../../../../../components/Input/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useRef, useState } from 'react';
import useRepairDetail from '../../ModalRepairDetail/useRepairDetail';
function PartMenuDetail({ cancel, repair_id, refresh, setBandera}) {
    const [unitsByPart, setUnitsByPart] = useState({});
    const isFirstNameRender = useRef(true);
    const { partList, getPartList, getPartListByName,
        numIndex, maxIndex, partName, setPartName, setNumIndex } = useParts();

    const { savePartDetailfunc } = useRepairDetail()

    useEffect(() => {
        if (partName !== "") return
        getPartList()

    }, [numIndex, partName]);

    useEffect(() => {
        if (isFirstNameRender.current) {
            isFirstNameRender.current = false;
            return;
        }
        if (partName !== "") {
            getPartListByName();
        }
    }, [numIndex, partName]);

    return (
        <>
            <h3>Ingresar Repuesto</h3>
            <div className={styles.upThings} >
                <Buttom extraClass={styles.addButton} action={() => cancel(false)} label="Cancelar"></Buttom>
                <Input value={partName} onChange={(e) => setPartName(e.target.value)}></Input>
                <Select value={maxIndex.includes(numIndex) ? numIndex : ''} onChange={(e) => setNumIndex(e.target.value)}>
                    {maxIndex.map((n) => (<MenuItem value={n}>{n}</MenuItem>))}
                </Select>
            </div>
            <div className={styles.distContainer}>
                <div>
                    <table className={styles.tabla}>
                        <thead>
                            <tr>
                                <th>REPUESTO</th>
                                <th>STOCK</th>
                                <th>PRECIO</th>
                                <th>UNIDADES</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {partList.map((part) => (
                                <tr className={styles.fila} key={part.id}>
                                    <td>{part.part_name}</td>
                                    <td>{part.stock}</td>
                                    <td>{`$${part.part_value}`}</td>
                                    <td><input min={1} max={part.stock} value={unitsByPart[part.id] || ''}
                                        onChange={(e) =>
                                            setUnitsByPart(prev => ({
                                                ...prev,
                                                [part.id]: Number(e.target.value)
                                            }))
                                        } type="number"></input></td>
                                    <td><Buttom action={async () => {await savePartDetailfunc({repair_id: repair_id,Sv_RpId: part.id,units: unitsByPart[part.id]? unitsByPart[part.id]: 1})
                                        refresh(repair_id);
                                        await setBandera(prev => prev + 1);
                                        cancel(false)
                                }} label="+"></Buttom></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default PartMenuDetail