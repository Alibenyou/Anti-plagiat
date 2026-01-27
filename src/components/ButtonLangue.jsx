function ButtonLangue(){
     return <>
            <select name="langue" id="" style={Styles.select}>
                        <option value="francais">Fr</option>
                        <option value="francais">En</option>
            </select>
            </>
}
const Styles = {
    select:{
    padding: '10px',
    borderRadius:'10px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    color:  '#333',
    boxShadow:'5px 5px 5px rgba(0,0,0,0.6)',
 },
 option:{
    padding:'10px'
 }
}
export default ButtonLangue;