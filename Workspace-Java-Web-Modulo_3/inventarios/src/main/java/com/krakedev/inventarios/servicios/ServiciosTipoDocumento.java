package com.krakedev.inventarios.servicios;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.krakedev.inventarios.entidades.TipoDocumento;
import com.krakedev.inventarios.excepciones.KrakeDevException;
import com.krakedev.inventarios.persistencia.TipoDocumentoBDD;

@Path("tipodocumentos")
public class ServiciosTipoDocumento {
	@Path("recuperar")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response recuperar(){
		TipoDocumentoBDD cli = new TipoDocumentoBDD();
		ArrayList<TipoDocumento> listaTipo = null;
		try {
			listaTipo = cli.recuperar();
			return Response.ok(listaTipo).build();
		} catch (KrakeDevException e) {
			e.printStackTrace();
			return Response.serverError().build();
		}
	}
	@Path("crear")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response crear(TipoDocumento tp) {
		TipoDocumentoBDD cli = new TipoDocumentoBDD();
		try {
			cli.insertar(tp);
			return Response.ok().build();
		} catch (KrakeDevException e) {
			e.printStackTrace();
			return Response.serverError().build();
		}
	}
}
