import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import api from "../../api/axios";
import { Articulo } from "../../models/Articulo.js";
import Spinner from "../../componets/Spinner";

function Ingreso() {
  const token = localStorage.getItem("token");

  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargarDatos = useCallback(async () => {
    if (!token) {
      setError("No se encontró el token de autenticación.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const decoded = jwtDecode(token);

      if (!decoded?.usuarioAgenciaid) {
        throw new Error(
          "El token no contiene el identificador de la agencia."
        );
      }

      const response = await api.get(
        `/articulos/${decoded.usuarioAgenciaid}`
      );

      const datos = Array.isArray(response.data)
        ? response.data
        : [];

      const articulosConvertidos = datos.map(
        (item) => new Articulo(item)
      );

      setArticulos(articulosConvertidos);
    } catch (err) {
      console.error("Error al cargar los artículos:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "No fue posible cargar los artículos."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  return (
    <div className="min-h-screen bg-slate-500 p-4 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold uppercase">
          Ingreso de artículos
        </h1>

        <button
          type="button"
          className="btn-principal"
        >
          Nueva orden
        </button>
      </div>

      <div className="rounded-lg bg-gradient-to-r from-blue-300 to-blue-700 p-4">
        {loading && (
          <Spinner
            fullScreen
            size="lg"
            text="Cargando datos"
          />
        )}

        {!loading && error && (
          <div className="rounded-lg bg-red-100 p-4 text-red-700">
            <p className="font-semibold">{error}</p>

            <button
              type="button"
              onClick={cargarDatos}
              className="mt-3 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Volver a intentar
            </button>
          </div>
        )}

        {!loading && !error && articulos.length === 0 && (
          <div className="rounded-lg bg-white p-4 text-center text-slate-700">
            No existen artículos registrados.
          </div>
        )}

        {!loading && !error && articulos.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-lg bg-white text-left text-slate-800 uppercase shadow-md">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="border border-slate-300 px-4 py-3">
                    Código
                  </th>

                  <th className="border border-slate-300 px-4 py-3">
                    Nombre
                  </th>

                  <th className="border border-slate-300 px-4 py-3">
                    Descripción
                  </th>

                  <th className="border border-slate-300 px-4 py-3 text-center">
                    Stock
                  </th>

                  <th className="border border-slate-300 px-4 py-3">
                    Medida
                  </th>

                 
                </tr>
              </thead>
              {articulos[0].codigo}

              <tbody>
                {articulos.map((articulo) => (
                  <tr
                    key={articulo.id}
                    className="hover:bg-slate-100 cursor-pointer"
                  >
                    <td className="border border-slate-300 px-4 py-3">
                      {articulo.codigo}
                    </td>

                    <td className="border border-slate-300 px-4 py-3 font-semibold">
                      {articulo.nombre}
                    </td>

                    <td className="border border-slate-300 px-4 py-3">
                      {articulo.descripcion || "Sin descripción"}
                    </td>

                    <td className="border border-slate-300 px-4 py-3 text-center">
                    {articulo.stock|| ""}
                    </td>

                    <td className="border border-slate-300 px-4 py-3">
                      {articulo.medida?.nombre || "Sin medida"}
                    </td>

                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ingreso;