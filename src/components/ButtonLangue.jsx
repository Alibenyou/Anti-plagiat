function ButtonLangue(){
     return <>
            <select name="langue" id="" style={Styles.select}>
                        <option value="francais">francais</option>
                        <option value="francais">Anglais</option>
            </select>
            </>
}
const Styles = {
    select:{
    padding: '10px',
    borderRadius: '20px'
}
}
export default ButtonLangue;