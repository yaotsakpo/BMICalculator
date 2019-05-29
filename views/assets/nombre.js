function affect(val) {
	if ( (document.getElementById('Height').disabled==true) && (document.getElementById('Weight').disabled==false) )
	{
	document.getElementById('Weight').value +=val;
	}

	if ( (document.getElementById('Height').disabled==false) && (document.getElementById('Weight').disabled==true) )
	{
	document.getElementById('Height').value +=val;
	}
}

function back() {

	if ( (document.getElementById('Height').disabled==true) && (document.getElementById('Weight').disabled==false) )
	{
		val=document.getElementById('Weight').value;
		document.getElementById('Weight').value = val.substring(0,val.length-1);
	}
	if ( (document.getElementById('Height').disabled==false) && (document.getElementById('Weight').disabled==true) )
	{
		val=document.getElementById('Height').value;
		document.getElementById('Height').value = val.substring(0,val.length-1);
	}
}



