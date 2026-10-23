import { useState } from "react";
import {
  createStudent,
  listStudents,
  findStudentById,
  type Student,
} from "../../services/students.service.ts";

export default function StudentsPage() {
  const [organizationId, setOrganizationId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  function validateOrganizationId() {
    if (!organizationId.trim()) {
      setError("Ingresá el ID de la organización.");
      return false;
    }

    setError("");
    return true;
  }

  async function handleCreateStudent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateOrganizationId()) return;

    setLoading(true);
    setError("");
    setResult("");
    setSelectedStudent(null);

    try {
      const student = await createStudent(organizationId.trim(), {
        firstName,
        lastName,
      });

      setResult(`POST completado. Estudiante creado: ${student.id}`);
      setFirstName("");
      setLastName("");

      const updatedStudents = await listStudents(organizationId.trim());
      setStudents(updatedStudents);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al crear el estudiante.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleListStudents() {
    if (!validateOrganizationId()) return;

    setLoading(true);
    setError("");
    setResult("");
    setSelectedStudent(null);

    try {
      const data = await listStudents(organizationId.trim());

      setStudents(data);
      setResult(`GET completado. Se encontraron ${data.length} estudiantes.`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al listar estudiantes.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleFindStudent(studentId: string) {
    if (!validateOrganizationId()) return;

    setLoading(true);
    setError("");
    setResult("");

    try {
      const student = await findStudentById(organizationId.trim(), studentId);

      setSelectedStudent(student);
      setResult(`GET detalle completado: ${student.id}`);
    } catch (err) {
      setSelectedStudent(null);
      setError(
        err instanceof Error
          ? err.message
          : "Error al consultar el estudiante.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>Pruebas de estudiantes</h1>
      <p>
        Panel temporal para probar las operaciones del módulo de estudiantes.
      </p>

      <section>
        <h2>Organización</h2>

        <label htmlFor="organizationId">ID de la organización</label>

        <input
          id="organizationId"
          value={organizationId}
          onChange={(event) => setOrganizationId(event.target.value)}
          placeholder="UUID de la organización"
          style={{ display: "block", width: "100%", margin: "8px 0" }}
        />

        <button type="button" onClick={handleListStudents} disabled={loading}>
          GET — Listar estudiantes
        </button>
      </section>

      <hr />

      <section>
        <h2>Crear estudiante</h2>

        <form onSubmit={handleCreateStudent}>
          <label htmlFor="firstName">Nombre</label>
          <input
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
            maxLength={120}
            style={{ display: "block", width: "100%", margin: "8px 0" }}
          />

          <label htmlFor="lastName">Apellido</label>
          <input
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
            maxLength={120}
            style={{ display: "block", width: "100%", margin: "8px 0" }}
          />

          <button type="submit" disabled={loading}>
            POST — Crear estudiante
          </button>
        </form>
      </section>

      <hr />

      <section>
        <h2>Estudiantes encontrados</h2>

        {students.length === 0 ? (
          <p>No hay estudiantes cargados. Ejecutá la consulta de listado.</p>
        ) : (
          <ul>
            {students.map((student) => (
              <li key={student.id} style={{ marginBottom: 12 }}>
                <strong>
                  {student.first_name} {student.last_name}
                </strong>
                <br />
                <small>{student.id}</small>
                <br />
                <span>Estado: {student.status}</span>
                <br />

                <button
                  type="button"
                  onClick={() => handleFindStudent(student.id)}
                  disabled={loading}
                >
                  GET — Consultar detalle
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {selectedStudent && (
        <section>
          <h2>Detalle del estudiante</h2>
          <pre style={{ overflowX: "auto", padding: 12, background: "#eee" }}>
            {JSON.stringify(selectedStudent, null, 2)}
          </pre>
        </section>
      )}

      {error && (
        <section role="alert" style={{ color: "crimson", marginTop: 20 }}>
          <h2>Error</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{error}</pre>
        </section>
      )}

      {result && (
        <section role="status" style={{ marginTop: 20 }}>
          <h2>Resultado</h2>
          <p>{result}</p>
        </section>
      )}

      {loading && <p>Procesando solicitud...</p>}
    </main>
  );
}
