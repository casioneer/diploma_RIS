import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && token) {
      loadOrders();
    }
  }, [isAuthenticated, token, currentPage]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/orders?page=${currentPage}`);
      setOrders(response.data.orders || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      if (error?.response?.status === 401) {
        try {
          const refresh = await axios.post('/auth/refresh-token');
          const newToken = refresh.data?.token;
          if (newToken) {
            await axios.get(`/orders?page=${currentPage}`)
              .then(r => {
                setOrders(r.data.orders || []);
                setTotalPages(r.data.totalPages || 1);
                return;
              });
            return;
          }
        } catch (_) {
          // ignore, will fall through to toast below
        }
      }
      console.error('Failed to load orders:', error);
      toast.error('Не удалось загрузить заказы');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'completed':
        return 'Завершён';
      case 'pending':
        return 'В обработке';
      case 'cancelled':
        return 'Отменён';
      default:
        return status || 'Не указан';
    }
  };

  const NotAuthenticated = (
    <div className="min-h-[60vh] bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Войдите в систему
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Для просмотра заказов необходимо войти в систему
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  );

  const Loading = (
    <div className="min-h-[60vh] bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Загрузка заказов...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 min-h-screen">
      <Navbar onCartClick={() => {}} onNavigate={(id)=>navigate('/')} />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            История заказов
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-md"
          >
            Назад
          </button>
        </div>

        {(!isAuthenticated || !token)
          ? NotAuthenticated
          : (loading
              ? Loading
              : (
                <>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Заказов пока нет
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Когда вы сделаете заказ, он появится здесь
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.order_id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Заказ #{order.order_id}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(order.date)}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                {getStatusLabel(order.status)}
                              </span>
                              <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                                {order.amount} ₽
                              </p>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Способ оплаты:</span>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {order.payment_method || 'Не указан'}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Количество товаров:</span>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {order.total || 0} шт.
                                </p>
                              </div>
                              {order.ref && (
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">Номер транзакции:</span>
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {order.ref}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {totalPages > 1 && (
                        <div className="flex justify-center mt-8">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                              disabled={currentPage === 1}
                              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                            >
                              Назад
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                              <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-2 text-sm font-medium rounded-md ${
                                  page === currentPage
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
                                }`}
                              >
                                {page}
                              </button>
                            ))}
                            <button
                              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                              disabled={currentPage === totalPages}
                              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                            >
                              Вперед
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )
            )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
