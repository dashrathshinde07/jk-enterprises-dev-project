// import React, { useEffect, useState } from "react";
// import {
//   getAllParentEntities,
//   archiveParentEntity,
// } from "../../api/parentEntityApi";
// import Modal from "../../components/Modal";
// import TableActions from "../../components/TableActions";
// import ParentEntityForm from "./ParentEntityForm";
// import ParentEntityEdit from "./ParentEntityEdit";
// import { Edit } from "lucide-react";

// const ParentEntityList = () => {
//   const [parentEntities, setParentEntities] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showAdd, setShowAdd] = useState(false);
//   const [editData, setEditData] = useState(null);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await getAllParentEntities();
//       setParentEntities(res.data || res);
//     } catch (err) {
//       console.error("Error loading parent entities", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold text-[#2C498D]">
//           Parent Categories
//         </h2>
//         <button
//           onClick={() => setShowAdd(true)}
//           className="bg-[#2C498D] text-white px-4 py-2 rounded"
//         >
//           Add Parent
//         </button>
//       </div>

//       <div className="overflow-x-auto border rounded bg-white shadow-sm">
//         <table className="w-full text-sm text-left">
//           <thead className="bg-[#2C498D] text-white">
//             <tr>
//               <th className="p-3">Title</th>
//               <th className="p-3">Slug</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {parentEntities.map((entity) => (
//               <tr key={entity._id} className="border-b">
//                 <td className="p-3">{entity.title}</td>
//                 <td className="p-3">{entity.slug}</td>
//                 <td className="p-3">{entity.status}</td>
//                 <td className="p-3 flex gap-2">
//                   <button
//                     onClick={() => {
//                       setEditData(entity);
//                     }}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     <Edit size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Modal */}
//       <Modal
//         title="Add Parent Category"
//         isOpen={showAdd}
//         onClose={() => setShowAdd(false)}
//       >
//         <ParentEntityForm
//           onSuccess={() => {
//             setShowAdd(false);
//             fetchData();
//           }}
//         />
//       </Modal>

//       {/* Edit Modal */}
//       <Modal
//         title="Edit Parent Category"
//         isOpen={!!editData}
//         onClose={() => setEditData(null)}
//       >
//         <ParentEntityEdit
//           data={editData}
//           onSuccess={() => {
//             setEditData(null);
//             fetchData();
//           }}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default ParentEntityList;



import React, { useEffect, useState } from "react";
import {
  getAllParentEntities,
  archiveParentEntity,
} from "../../api/parentEntityApi";
import Modal from "../../components/Modal";
import ParentEntityForm from "./ParentEntityForm";
import ParentEntityEdit from "./ParentEntityEdit";
import { Plus, Edit, Archive, Folder, RefreshCw, RotateCcw } from "lucide-react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const ParentEntityList = () => {
  const [parentEntities, setParentEntities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);
  const [archivingEntityId, setArchivingEntityId] = useState(null);
  const [showConfirmArchive, setShowConfirmArchive] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllParentEntities();
      setParentEntities(res.data || res);
    } catch (err) {
      console.error("Error loading parent entities", err);
      setError("Failed to load parent entities. Please try again.");
      toast.error("Failed to fetch parent entities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [title, settitle] = useState("")

  const handleArchive = (id, title) => {
    settitle(title)
    setArchivingEntityId(id);
    setShowConfirmArchive(true);
  };

  const confirmArchive = async () => {
    const toastId = toast.loading("Archiving parent entity...");

    try {
      await archiveParentEntity(archivingEntityId);

      toast.update(toastId, {
        render: "Parent entity archived successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      fetchData();
    } catch (error) {
      console.error("Error archiving parent entity:", error);

      toast.update(toastId, {
        render: error?.response?.data?.message || "Failed to archive parent entity.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setShowConfirmArchive(false);
      setArchivingEntityId(null);
    }
  };

  const cancelArchive = () => {
    setShowConfirmArchive(false);
    setArchivingEntityId(null);
  };


  console.log(parentEntities);

  // Confirmation Modal Component
  const ConfirmArchiveModal = () => {
    if (!showConfirmArchive) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white p-6 rounded-xl shadow-2xl text-center space-y-4 max-w-md w-full mx-4">
          <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <Archive size={32} className="text-yellow-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Archive Parent Entity</h3>
          <p className="text-slate-600">Are you sure you want to archive this <span className="text-sm font-bold text-slate-800">{title}</span> parent entity? You can restore it later if needed.</p>
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={confirmArchive}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Yes, Archive
            </button>
            <button
              onClick={cancelArchive}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      draft: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-800",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status] || statusColors.draft}`}>
        {status || 'Draft'}
      </span>
    );
  };

  if (error && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="min-h-96 flex flex-col items-center justify-center p-8">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Folder size={48} className="text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Something went wrong</h3>
            <p className="text-red-600 mb-6 max-w-md">{error}</p>
            <button
              onClick={fetchData}
              className="bg-gradient-to-r from-blue-600 cursor-pointer to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto transform hover:scale-[1.02]"
            >
              <RotateCcw size={18} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 */}
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Parent Categories
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Manage your top-level category structure</p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="bg-gradient-to-r from-blue-600 cursor-pointer to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-[1.02]"
        >
          <Plus size={20} />
          Add Parent Category
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        /* Parent Entities Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {parentEntities.map((entity, index) => (
            <div
              key={entity._id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 transform hover:scale-[1.02]"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Icon/Header Container */}
              <div className="relative">
                <div className="h-32 bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center relative overflow-hidden">
                  <Folder size={48} className="text-white/80 group-hover:scale-110 transition-transform duration-300" />

                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-2 left-2 w-4 h-4 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-2 border-white rounded-lg"></div>
                    <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full"></div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button
                      onClick={() => setEditData(entity)}
                      className="bg-white/90 backdrop-blur-sm cursor-pointer p-2 rounded-lg hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                      title="Edit parent entity"
                    >
                      <Edit size={16} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleArchive(entity._id, entity?.title)}
                      className="bg-white/90 backdrop-blur-sm p-2 cursor-pointer rounded-lg hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                      title="Archive parent entity"
                    >
                      <Archive size={16} className="text-yellow-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300 min-h-[3rem]">
                  {entity.title || 'Untitled Parent Category'}
                </h3>

                {/* Slug */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">SLUG:</span>
                  <code className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded font-mono">
                    {entity.slug || 'no-slug'}
                  </code>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    {getStatusBadge(entity.status)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && parentEntities.length === 0 && (
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Folder size={48} className="text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">No parent categories yet</h3>
          <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">
            Start building your category hierarchy by creating your first parent category.
          </p>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Create Your First Parent Category
          </button>
        </div>
      )}

      {/* Modals */}
      <Modal
        title="Add Parent Category"
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
      >
        <ParentEntityForm
          onSuccess={() => {
            setShowAdd(false);
            fetchData();
          }}
        />
      </Modal>

      <Modal
        title="Edit Parent Category"
        isOpen={!!editData}
        onClose={() => setEditData(null)}
      >
        <ParentEntityEdit
          data={editData}
          onSuccess={() => {
            setEditData(null);
            fetchData();
          }}
        />
      </Modal>

      {/* Confirmation Archive Modal */}
      <ConfirmArchiveModal />
    </div>
  );
};

export default ParentEntityList;