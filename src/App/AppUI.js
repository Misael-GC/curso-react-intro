import React from "react";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { CreateTodoButton } from "../CreateTodoButton";
import { Nadvar } from "../Nadvar";
import { Footer } from "../Footer";
import { Graficos } from "../Graficos";
import { TodosLoading } from "../TodosLoading";
import { TodosError } from "../TodosError";
import { EmptyTodos } from "../EmptyTodos";
import { TodoSearchLoading } from "../TodoSearchLoading";
import { TodoCounterLoading } from "../TodoCounterLoading";
import { TodoGraphicLoading } from "../TodoGraphicLoading";
import { Modal } from "../Modal";
import { TodoContext } from "../TodoContext";
import { TodoForm } from "../TodoForm";
import { Filtros } from "../Filtros";
import { TodoPagination } from "../TodoPagination";

function AppUI() {
  const {
    loading,
    error,
    completedTodos,
    totalTodos,
    searchedTodos,
    completeTodo,
    deleteTodo,
    showSearch,
    showCounter,
    showGraphic,
    openModal,
    paginatedTodos,
    setEditingTodo,
    setOpenModal
  } = React.useContext(TodoContext);

  return (
    <>
      <Nadvar />

      <main className="dashboard-container container-fluid py-4 px-md-5">
        <div className="row g-4">
          
          {/* Left Column: Progress & Stats */}
          <div className="col-12 col-lg-5 col-xl-4">
            <div className="glass p-4 rounded-4 h-100 d-flex flex-column gap-4">
              <div>
                <h2 className="fs-4 fw-bold mb-1 text-primary">Tu Progreso</h2>
                <p className="text-secondary small">Estadísticas y resumen de tus metas actuales</p>
              </div>

              {loading ? (
                <TodoCounterLoading />
              ) : (
                showCounter && <TodoCounter />
              )}

              {loading ? (
                <TodoGraphicLoading />
              ) : (
                showGraphic && <Graficos completed={completedTodos} total={totalTodos} />
              )}
            </div>
          </div>

          {/* Right Column: Search, Filter & List */}
          <div className="col-12 col-lg-7 col-xl-8">
            <div className="glass p-4 rounded-4 h-100 d-flex flex-column gap-4">
              <div>
                <h2 className="fs-4 fw-bold mb-1 text-primary">Lista de Tareas</h2>
                <p className="text-secondary small">Busca, filtra y gestiona tus actividades diarias</p>
              </div>

              <div className="d-flex flex-column gap-2">
                {loading ? (
                  <TodoSearchLoading />
                ) : (
                  showSearch && <TodoSearch />
                )}
                
                {!loading && <Filtros />}
              </div>

              <div className="todo-list-wrapper">
                <TodoList>
                  {paginatedTodos.map((todo) => (
                    <TodoItem
                      key={todo.text}
                      text={todo.text}
                      completed={todo.completed}
                      onComplete={() => completeTodo(todo.text)}
                      onDelete={() => deleteTodo(todo.text)}
                      onEdit={() => {
                        setEditingTodo(todo);
                        setOpenModal(true);
                      }}
                    />
                  ))}
                </TodoList>

                {!loading && <TodoPagination />}

                {loading && <TodosLoading />}
                {error && <TodosError />}
                {!loading && searchedTodos.length === 0 && <EmptyTodos />}
              </div>
            </div>
          </div>

        </div>
      </main>

      <CreateTodoButton />

      {openModal && (
        <Modal>
          <TodoForm />
        </Modal>
      )}

      <Footer />
    </>
  );
}

export { AppUI };
