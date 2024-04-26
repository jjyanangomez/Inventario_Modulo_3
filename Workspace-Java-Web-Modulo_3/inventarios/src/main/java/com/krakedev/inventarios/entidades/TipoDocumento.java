package com.krakedev.inventarios.entidades;

public class TipoDocumento {
	private String codigoDoc;
	private String descripcion;
	
	public TipoDocumento() {

	}
	public TipoDocumento(String codigoDoc, String descripcion) {
		super();
		this.codigoDoc = codigoDoc;
		this.descripcion = descripcion;
	}
	public String getCodigoDoc() {
		return codigoDoc;
	}
	public void setCodigoDoc(String codigoDoc) {
		this.codigoDoc = codigoDoc;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	@Override
	public String toString() {
		return "TipoDocumento [codigoDoc=" + codigoDoc + ", descripcion=" + descripcion + "]";
	}
	
	
}
