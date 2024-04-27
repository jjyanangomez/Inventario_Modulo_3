package com.krakedev.inventarios.entidades;

public class UnidadDeMedida {
	private String codigoUdm;
	private String descripcion;
	private CategoriaUDM categoriaUdm;
	
	public UnidadDeMedida() {

	}
	public UnidadDeMedida(String codigoUdm, String descripcion, CategoriaUDM categoriaUdm) {
		super();
		this.codigoUdm = codigoUdm;
		this.descripcion = descripcion;
		this.categoriaUdm = categoriaUdm;
	}
	public String getCodigoUdm() {
		return codigoUdm;
	}
	public void setCodigoUdm(String codigoUdm) {
		this.codigoUdm = codigoUdm;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public CategoriaUDM getCategoriaUdm() {
		return categoriaUdm;
	}
	public void setCategoriaUdm(CategoriaUDM categoriaUdm) {
		this.categoriaUdm = categoriaUdm;
	}
	@Override
	public String toString() {
		return "UnidadDeMedida [codigoUdm=" + codigoUdm + ", descripcion=" + descripcion + ", categoriaUdm="
				+ categoriaUdm + "]";
	}
	
}
