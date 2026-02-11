import { Order } from '../types';

export const sendNotification = (order: Order): boolean => {
  // Simular envio de notificação
  // Em produção real, aqui seria integrado com serviço de email/SMS
  
  const statusMessages = {
    'Aguardando': 'Seu pedido foi recebido e está aguardando processamento.',
    'Processando': 'Seu pedido está sendo preparado! Em breve estará pronto.',
    'Finalizado': 'Seu pedido foi finalizado e está pronto para entrega!',
    'Entregue': 'Seu pedido foi entregue com sucesso! Obrigado pela preferência.'
  };

  const message = `
    Olá ${order.nome}!
    
    ${statusMessages[order.status]}
    
    Pedido #${order.id}
    Status: ${order.status}
    Total: €${order.total.toFixed(2)}
    ${order.estabelecimento ? `Estabelecimento: ${order.estabelecimento}` : ''}
    ${order.telefone ? `Telefone: ${order.telefone}` : ''}
  `;

  console.log('📧 NOTIFICAÇÃO ENVIADA:', message);
  
  // Em produção, aqui seria:
  // - Enviar email via API
  // - Enviar SMS via Twilio/similar
  // - Enviar push notification
  
  return true;
};