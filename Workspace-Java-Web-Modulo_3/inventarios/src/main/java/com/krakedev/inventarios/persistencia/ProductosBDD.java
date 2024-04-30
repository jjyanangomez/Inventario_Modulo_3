package com.krakedev.inventarios.persistencia;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.krakedev.inventarios.entidades.Categoria;
import com.krakedev.inventarios.entidades.CategoriaUDM;
import com.krakedev.inventarios.entidades.Producto;
import com.krakedev.inventarios.entidades.UnidadDeMedida;
import com.krakedev.inventarios.excepciones.KrakeDevException;
import com.krakedev.inventarios.utils.ConexionBdd;



public class ProductosBDD {
	public ArrayList<Producto> buscar(String subCadena) throws KrakeDevException{
		ArrayList<Producto> ListProductos = new ArrayList<Producto>();
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs= null;
		Producto p = null;
		try {
			con = ConexionBdd.obtenerConexion();
			ps = con.prepareStatement("select pro.codigo_producto, pro.nombre AS nombre_producto, "
					+ "udm.codigo_udm, udm.descripcion AS descripcion_udm, "
					+ "cast(pro.precio_venta as decimal(6,2)),pro.tiene_iva,cast(pro.coste as decimal(5,4)), "
					+ "pro.categoria,ca.nombre As nombre_categoria,pro.stock "
					+ "from productos pro,unidad_medida udm, categorias ca "
					+ "Where pro.udm = udm.codigo_udm AND pro.categoria =ca.codigo_cat "
					+ "AND upper(pro.nombre) like ?;");
			ps.setString(1, "%"+subCadena.toUpperCase()+"%");
			rs = ps.executeQuery();
			while (rs.next()) {
				int codigoProducto = rs.getInt("codigo_producto");	
				String nombreProducto = rs.getString("nombre_producto");
				String codigoUdm = rs.getString("codigo_udm");
				String descripcionUdm = rs.getString("descripcion_udm");
				BigDecimal precioVenta = rs.getBigDecimal("precio_venta");
				boolean tieneIva= rs.getBoolean("tiene_iva");
				BigDecimal coste = rs.getBigDecimal("coste");
				int codigoCategoria = rs.getInt("categoria");
				String nombreCategoria = rs.getString("nombre_categoria");
				int stock = rs.getInt("stock");
				
				UnidadDeMedida udm = new UnidadDeMedida();
				udm.setCodigoUdm(codigoUdm);
				udm.setDescripcion(descripcionUdm);
				
				Categoria categoria = new Categoria();
				categoria.setCodigoCat(codigoCategoria);
				categoria.setNombre(nombreCategoria);
				
				p = new Producto();
				p.setCodigo(codigoProducto);
				p.setNombre(nombreProducto);
				p.setUdm(udm);
				p.setPrecioVenta(precioVenta);
				p.setTieneIva(tieneIva);
				p.setCoste(coste);
				p.setCategoria(categoria);
				p.setStock(stock);
				ListProductos.add(p);
			}
			
		} catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al consultar: "+e.getMessage());
		}
		return ListProductos;
	}
	
	public void insertar(Producto p) throws KrakeDevException {
		Connection con = null;
		PreparedStatement ps = null;
		try {
			con = ConexionBdd.obtenerConexion();
			ps = con.prepareStatement("INSERT INTO productos (nombre,udm,precio_venta,tiene_iva,coste,categoria,stock) "
					+ "VALUES (?,?,?,?,?,?,?);");
			ps.setString(1, p.getNombre());
			ps.setString(2, p.getUdm().getCodigoUdm());
			ps.setBigDecimal(3, p.getPrecioVenta());
			ps.setBoolean(4, p.isTieneIva());
			ps.setBigDecimal(5, p.getCoste());
			ps.setInt(6, p.getCategoria().getCodigoCat());
			ps.setInt(7, p.getStock());
			ps.executeUpdate();
		} catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al insertar el producto: "+e.getMessage());
		}
	}
	public void actualizar(Producto p) throws KrakeDevException {
		Connection con = null;
		PreparedStatement ps = null;
		try {
			con = ConexionBdd.obtenerConexion();
			ps = con.prepareStatement("UPDATE productos SET nombre =?, udm=?, "
					+ "precio_venta=?, tiene_iva=?, coste=?, categoria=? "
					+ "WHERE codigo_producto=?;");
			ps.setString(1, p.getNombre());
			ps.setString(2, p.getUdm().getCodigoUdm());
			ps.setBigDecimal(3, p.getPrecioVenta());
			ps.setBoolean(4, p.isTieneIva());
			ps.setBigDecimal(5, p.getCoste());
			ps.setInt(6, p.getCategoria().getCodigoCat());
			ps.setInt(7, p.getCodigo());
			ps.executeUpdate();
		} catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al actualizar. Detalle: "+e.getMessage());
		}
	}
	
	public Producto buscarPorId(int codigo) throws KrakeDevException {
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs= null;
		Producto p = null;
		try {
			con = ConexionBdd.obtenerConexion();
			ps = con.prepareStatement("select pro.codigo_producto, pro.nombre, udm.codigo_udm, udm.descripcion AS descripcion_udm, udm.categoria_udm, cast(pro.precio_venta as decimal(6,2)), "
					+ "pro.tiene_iva, cast(pro.coste as decimal(5,4)), pro.categoria, c.nombre As nombre_categoria, pro.stock "
					+ "from productos pro, categorias c, unidad_medida udm "
					+ "Where pro.categoria = c.codigo_cat AND pro.udm = udm.codigo_udm AND codigo_producto=?;");
			ps.setInt(1, codigo);
			rs = ps.executeQuery();
			if (rs.next()) {
				String codigoUdm = rs.getString("codigo_udm");
				String descripcion = rs.getString("descripcion_udm");
				CategoriaUDM categoriaUdm = new CategoriaUDM(rs.getString("categoria_udm"), null);
				UnidadDeMedida udm = new UnidadDeMedida(codigoUdm, descripcion, categoriaUdm);
				
				int codigoCat = rs.getInt("categoria");
				String nombreCategoria = rs.getString("nombre_categoria");
				Categoria cate = new Categoria(codigoCat, nombreCategoria, null);
				
				int codigoProducto = rs.getInt("codigo_producto");
				String nombreProducto = rs.getString("nombre");
				BigDecimal precioVenta = rs.getBigDecimal("precio_venta");
				boolean tieneIva = rs.getBoolean("tiene_iva");
				BigDecimal coste = rs.getBigDecimal("coste");;
				int stock = rs.getInt("stock");
				p = new Producto(codigoProducto, nombreProducto, udm, precioVenta, tieneIva, coste, cate, stock);
			}
		}catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al consultar: "+e.getMessage());
		}
	 
		return p;
	}
}
