var del = (id) => {
    if(confirm("삭제하시겠습니까?") == false){
        return
    }
    
    fetch('/api/delete/'+id,{
        method:"POST"
    }).then(response => {
        if(response.status == 200){
            alert("게시물이 삭제 되었습니다.")
            window.location = '/'
        }
    })
}
var update = (id) => {
    fetch('/api/update/'+id,{
        method:"POST"
    }).then(response => {
        if(response.status == 200){
            alert("게시물이 업데이트 되었습니다.")
            window.location = '/'
        }
    })
}